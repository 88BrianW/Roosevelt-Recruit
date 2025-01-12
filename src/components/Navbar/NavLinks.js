import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseconfig';
import { getDoc, doc } from 'firebase/firestore';
import { handleLogout } from '../../services/authService';
import AuthModal from '../authModal.js';

const NavLinks = () => {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setUser(user);
            if (user) {
                // Fetch userType from Firestore and set it here
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setUserType(userDoc.data().userType);
                }
            } else {
                setUserType('');
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogoutClick = async () => {
        await handleLogout();
        setUser(null);
        setUserType('');
        navigate('/'); // Redirect to home page
    };

    return (
        <>
            <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900" smooth to="/#about">
                About
            </HashLink>
            <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900" smooth to="/#services">
                Services
            </HashLink>
            <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900" smooth to="/#contact">
                Contact Us
            </HashLink>
            {user && user.email === 'admin1@gmail.com' && (
                <HashLink className="text-white bg-green-900 hover:bg-green-700 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl" smooth to="/admin-portal">
                    Admin Portal
                </HashLink>
            )}
            {user && userType === 'student' && (
                <HashLink className="text-white bg-orange-900 hover:bg-orange-700 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl" smooth to="/student-portal">
                    Student Portal
                </HashLink>
            )}
            {user && userType === 'business' && (
                <HashLink className="text-white bg-blue-900 hover:bg-blue-700 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl" smooth to="/employer-portal">
                    Employer Portal
                </HashLink>
            )}
            {user ? (
                <button
                    className="text-white bg-orange-700 hover:bg-orange-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl"
                    onClick={handleLogoutClick}
                >
                    Logout
                </button>
            ) : (
                <>
                    <button
                        className="text-white bg-orange-700 hover:bg-orange-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Login / Signup
                    </button>
                    <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setUserType={setUserType} />
                </>
            )}
        </>
    );
};

export default NavLinks;