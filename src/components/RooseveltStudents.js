import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseconfig';
import AuthModal from './authModal';

const RooseveltStudents = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigate('/employer-portal');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleEmployerPortalClick = () => {
        if (auth.currentUser) {
            navigate('/employer-portal');
        } else {
            setIsModalOpen(true);
        }
    };

    return (
        <div className="bg-white py-16 px-4 text-center">
            <h1 className="text-4xl font-bold text-[#002855] mb-8">Roosevelt Students are the BEST!</h1>

            <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-12" data-aos="fade-up">
                <div className="bg-[#FFF8F0] flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-64">
                    <h2 className="text-5xl font-bold text-[#D96500] mb-2">4.6</h2>
                    <p className="text-lg text-[#002855] font-medium">Average GPA</p>
                </div>
                <div className="bg-[#FFF8F0] flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-64" data-aos="fade-up">
                    <h2 className="text-5xl font-bold text-[#D96500] mb-2">5,000+</h2>
                    <p className="text-lg text-[#002855] font-medium">Total Students</p>
                </div>
                <div className="bg-[#FFF8F0] flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-64" data-aos="fade-up">
                    <h2 className="text-5xl font-bold text-[#D96500] mb-2">600+</h2>
                    <p className="text-lg text-[#002855] font-medium">Students on President's Honor Roll</p>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-3xl font-bold text-[#002855] mb-4" data-aos="fade-up">Are you an employer?</h2>
                <p className="text-lg font-semibold text-[#002855] mb-6" data-aos="fade-up">Hire the future today!</p>
                <button 
                    onClick={handleEmployerPortalClick}
                    className="bg-[#002855] text-white px-8 py-3 rounded-lg font-medium shadow hover:bg-[#001F3F]"
                >
                    Employer Portal
                </button>
            </div>

            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default RooseveltStudents;