import React from 'react';
import {Link} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Twitter from '../images/twitter.png'
import Facebook from '../images/facebook.png'
import Instagram from '../images/instagram.png'

const Footer = () => {
    return (
        <>
            <footer className="">
                <div className="footer flex flex-col mx-auto px-4 sm:px-6 bg-gray-100 border-t border-b py-30">

                    {
                        /*
                        Content section
                        */
                    }
                    <div className="sm:flex sm:flex-col  md:grid md:grid-cols-8 gap-10 py-8 md:py-12 border-t border-gray-200 lg:ml-11">

                    {/* Links */}
                    <div className="col-span-6 md:col-span-6 lg:col-span-1 ml-7 mx-auto">
                        <h6 className="text-[#013289] text-xl font-bold mb-2">LINKS</h6>
                        <ul className="text-md">
                        <li className="mb-2">
                            <HashLink smooth to="#about" className="text-blue-900 hover:text-blue-700">About</HashLink>
                        </li>
                        <li className="mb-2">
                            <HashLink smooth to="#services" className="text-blue-900 hover:text-blue-700">Services</HashLink>
                        </li>
                        <li className="mb-2">
                            <HashLink smooth to="#contact" className="text-blue-900 hover:text-blue-700">Contact</HashLink>
                        </li>                            
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="col-span-6 md:col-span-6 lg:col-span-4 mx-auto ml-7 md:ml-0">
                        <h6 className="text-[#013289] text-xl font-bold mb-2 pt-4">OUR SERVICES</h6>
                        <ul className="text-md">
                        <li className="mb-2">
                            <Link to="#" className="text-blue-900 hover:text-blue-700">Career Exploration</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="#" className="text-blue-900 hover:text-blue-700">Internships</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="#" className="text-blue-900 hover:text-blue-700">Recruiting Events</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="#" className="text-blue-900 hover:text-blue-700">Student-Teacher Recommendations</Link>
                        </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="col-span-12 text-center mx-auto lg:col-span-3 font-bold uppercase text-blue-900 mt-8">
                        <div className="text-xl mb-6">
                            Social Media
                        </div>

                        <div className="mx-auto text-center mt-2">
                            <ul className="flex justify-center mb-4 md:mb-0">
                                <li>
                                    <a 
                                        href="https://x.com/erhsofficial?lang=en" 
                                        className="flex justify-center items-center text-blue-900 hover:text-gray-500 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" 
                                        aria-label="Twitter"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src={Twitter} alt="Twitter" className="w-8 h-8"/>
                                    </a>
                                </li>
                                <li className="ml-4">
                                    <a 
                                        href="https://www.facebook.com/eleanorroosevelthighschool/" 
                                        className="flex justify-center items-center text-blue-900 hover:text-gray-500 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" 
                                        aria-label="Facebook"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src={Facebook} alt="Facebook" className="w-8 h-8"/>
                                    </a>
                                </li>
                                <li className="ml-4">
                                    <a 
                                        href="https://www.instagram.com/erhs_mustangs/?hl=en" 
                                        className="flex justify-center items-center text-blue-900 hover:text-gray-500 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" 
                                        aria-label="Instagram"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src={Instagram} alt="Instagram" className="w-8 h-8"/>
                                    </a>
                                </li>
                            </ul>
                        </div>



                    </div>          

                    </div>

                    {
                        /*
                        Copyright section
                        */
                    }
                    <div className="flex flex-wrap items-center md:justify-between justify-center mx-auto px-4">
                        <div className="w-full md:w-4/12 px-4 mx-auto text-center py-2">
                            <div className="text-sm text-gray-500 font-bold py-1">
                            Copyright &copy; {new Date().getFullYear()}{"  "}
                            <HashLink
                                to="#"
                                className=" hover:text-gray-900"
                            >
                                Brian Wang, Ethan Tran, Praneet Dumpa
                            </HashLink>. All rights reserved.
                            </div>
                        </div>
                    </div>

                </div>
                
            </footer>
        </>
    )
}
export default Footer;
