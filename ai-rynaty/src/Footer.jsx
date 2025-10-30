import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="bg-dark  " id='contact'>
                <div className="footer">
                    <div className="container">
                        <div className="row">


                            <div className="col-md-4 ">
                                <h5 className="fw-bold Artificial">Rynaty</h5>
                                <p className='footer-p'>
                                    The next generation of conversational AI, designed for speed, accuracy, and privacy.
                                </p>
                            </div>


                            <div className="col-md-4 ">
                                <h5 className="fw-bold Artificial">Product</h5>
                                <ul className="list-unstyled">
                                    <li><a href="#" className="text-light text-decoration-none">Chat app</a></li>
                                    <li><a href="https://www.tsaritservices.com/" className="text-light text-decoration-none">API</a></li>
                                    <li><a href="https://hms.tsaritservices.com/" className="text-light text-decoration-none"> Integrations</a></li>
                                    <li><a href="https://billing.tsaritservices.com/" className="text-light text-decoration-none"> Pricing</a></li>
                                </ul>
                            </div>


                            <div className="col-md-4 ">
                                <h5 className="fw-bold Artificial">Company</h5>
                                <ul className="list-unstyled">
                                    <li><a href="#" className="text-light text-decoration-none">About Us</a></li>
                                    <li><a href="https://www.tsaritservices.com/" className="text-light text-decoration-none">Careers</a></li>
                                    <li><a href="https://hms.tsaritservices.com/" className="text-light text-decoration-none"> Blog</a></li>
                                    <li><a href="https://billing.tsaritservices.com/" className="text-light text-decoration-none"> Press</a></li>
                                </ul>
                            </div>


                        </div>

                        <hr className="border-light " />
                        <div className="text-center">
                            <p className="mb-0"> @Artificial intelligence Rynaty. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
