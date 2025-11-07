from fastapi import FastAPI, HTTPException, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List
import httpx, smtplib, os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from dotenv import load_dotenv

load_dotenv()

# -------------------- DB Setup --------------------
DB_URL = "mysql+pymysql://root:root@localhost/rynaty"
engine = create_engine(DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# -------------------- App Setup --------------------
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- Chat (Groq API) --------------------
groq_api_key = os.getenv("GROQ_API_KEY")

class Message(BaseModel):
    text: str
    sender: str

class ChatRequest(BaseModel):
    message: str
    conversation_history: List[Message] = []

@app.post("/chat")
async def chat_with_groq(request: ChatRequest):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {groq_api_key}"
    }
    messages = [{"role": m.sender, "content": m.text} for m in request.conversation_history]
    messages.append({"role": "user", "content": request.message})
    payload = {"model": "llama-3.1-8b-instant", "messages": messages, "temperature": 0.7, "max_tokens": 256}

    try:
        async with httpx.AsyncClient() as client:
            res = await client.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=payload)
            res.raise_for_status()
            data = res.json()
            return {"response": data["choices"][0]["message"]["content"]}
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=f"Groq API error: {e.response.text}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -------------------- Contact Model --------------------
class Contact(Base):
    __tablename__ = "contacts"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100))
    subject = Column(String(255))
    message = Column(Text)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------------------- Email Config --------------------
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = os.getenv("TSARIT_GMAIL", "tsaritservices@gmail.com")
SENDER_PASSWORD = os.getenv("TSARIT_PASSWORD", "glbb xoul bzal pjnu")
OLIVER_EMAIL = os.getenv("OLIVER_EMAIL", "oliver.ceo@rynatyai.com")
INFO_EMAIL = os.getenv("INFO_EMAIL", "info@tsaritservices.com")

# -------------------- Contact Form --------------------
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str | None = None
    message: str

# -------------------- Email Sender --------------------
def send_email(data: ContactForm):
    msg = MIMEMultipart()
    msg["From"] = SENDER_EMAIL
    msg["To"] = ", ".join([OLIVER_EMAIL, INFO_EMAIL])
    msg["Subject"] = f"Contact Form: {data.name}"

    html = f"""
    <html>
      <head>
        <style>
          body {{ font-family: Arial, sans-serif; background: #f8f9fa; padding: 20px; }}
          .box {{ background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #ddd; }}
          h2 {{ color: #333; }}
          p {{ margin: 6px 0; color: #555; }}
          strong {{ color: #000; }}
          hr {{ border: none; border-top: 1px solid #eee; margin: 15px 0; }}
        </style>
      </head>
      <body>
        <div class="box">
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Subject:</strong> {data.subject or '(No subject)'}</p>
          <p><strong>Message:</strong><br>{data.message}</p>
          <hr/>
          <p>This email was sent automatically from your website.</p>
        </div>
      </body>
    </html>
    """

    msg.attach(MIMEText(html, "html"))

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.sendmail(SENDER_EMAIL, [OLIVER_EMAIL, INFO_EMAIL], msg.as_string())
    except Exception as e:
        print("Email error:", e)

# -------------------- Contact Endpoint --------------------
@app.post("/contact/")
async def contact_us(data: ContactForm, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    new_contact = Contact(name=data.name, email=data.email, subject=data.subject, message=data.message)
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    background_tasks.add_task(send_email, data)
    return {"message": "Contact saved and email sent!"}

# -------------------- Run Server --------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
