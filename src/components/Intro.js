import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseconfig';
import AuthModal from './authModal';
import AOS from 'aos';

const Intro = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [redirectPath, setRedirectPath] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user && redirectPath) {
                navigate(redirectPath);
            }
        });

        return () => unsubscribe();
    }, [navigate, redirectPath]);

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            once: true, // Whether animation should happen only once
        });
    }, []);

    const handlePortalClick = (path) => {
        if (auth.currentUser) {
            navigate(path);
        } else {
            setRedirectPath(path);
            setIsModalOpen(true);
        }
    };

    return (
        <div>
            <br></br><br></br>
            <div
                className="my-4 text-center lg:text-center lg:my-0 w-full px-8"
                data-aos="zoom-in"
                data-aos-delay="500"
            >
                <h3 className="text-3xl text-orange-700 font-bold">Our Mission</h3>
                <div>
                    <p className="my-3 text-xl text-gray-600 font-semibold">
                        Eleanor Roosevelt strives to provide internship & career
                        opportunities for all students.
                    </p>
                </div>
                <br></br>
                <br></br>
                <div className="flex flex-row justify-center items-center space-x-4">
                    <button
                        onClick={() => handlePortalClick('/student-portal')}
                        className="text-white bg-blue-900 hover:bg-blue-500 inline-flex items-center justify-center px-6 py-2 text-lg shadow-xl rounded-2xl"
                    >
                        Student Portal
                    </button>
                    <button
                        onClick={() => handlePortalClick('/employer-portal')}
                        className="text-black bg-blue-300 hover:bg-blue-500 inline-flex items-center justify-center px-6 py-2 text-lg shadow-xl rounded-2xl"
                    >
                        Employer Portal
                    </button>
                </div>
            </div>
            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Intro;