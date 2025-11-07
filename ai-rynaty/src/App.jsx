import { Routes, Route } from 'react-router-dom'

import About from './About'
import Home from './Home'
import './App.css'
import Header from './Header'
import Footer from './Footer'
import Featurepage from './Featurepage'
import Pricepage from './Pricepage'
import Aboutpage from './Aboutpage'
import Login from './Login'
import Register from './Register'
import Contactpage from './Contactpage'
import Getstart from './Getstart'
import Chat from './components/Chat/index'
function App() {


  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path='/getstart' element={<Chat />} />

        <Route path='/aboutpage' element={<Aboutpage />} />
        <Route path="/featurepage" element={<Featurepage />} />
        <Route path="/pricepage" element={<Pricepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contact' element={<Contactpage />} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App
