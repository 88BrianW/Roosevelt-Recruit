import React from 'react';
import img from '../images/Web-developer.svg';
import { Link } from 'react-router-dom';

const Intro = () => {
    return (
        <>
                <div className="m-auto max-w-6xl p-2 md:p-12 h-5/6" id='about' >

                    <div className="flex flex-col-reverse lg:flex-row py-8 justify-between lg:text-left" data-aos="fade-up">
                        <div className="lg:w-1/2 flex flex-col lg:mx-4 justify-center">
                            <img alt="card img" className="rounded-t float-right" src={img} />
                        </div>
                        <div className="flex-col my-4 text-center lg:text-left lg:my-0 lg:justify-end w-full lg:w-1/2 px-8" data-aos="zoom-in" data-aos-delay="500">
                            
                            <h3 className="text-3xl  text-blue-900 font-bold">Eleanor Roosevelt strives to provide internship & career opportunities for all students</h3>
                            <div>
                                <p className='my-3 text-xl text-gray-600 font-semibold'>Our team is well vast in software development and is ready to help develop the applications of your choice.</p>
                            </div>
                            
                            <div>
                                <p className='my-3 text-xl text-gray-600 font-semibold'>We take responsibility for building custom software solutions that caters for automation of your business processes and improve efficiency.</p>
                            </div>
                            <Link to="/contact" className="text-white bg-orange-700 hover:bg-orange-800 inline-flex items-center justify-center w-full px-6 py-2 my-4 text-lg shadow-xl rounded-2xl sm:w-auto sm:mb-0 group">
                                Student Portal
                            </Link>
                            <Link to="/contact" className="text-white bg-orange-700 hover:bg-orange-800 inline-flex items-center justify-center w-full ml-24 px-6 py-2 my-4 text-lg shadow-xl rounded-2xl sm:w-auto sm:mb-0 group">
                                Employer Portal
                            </Link>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Intro;