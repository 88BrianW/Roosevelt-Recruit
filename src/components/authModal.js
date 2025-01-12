import React, { useState } from 'react';
import { handleGoogleLogin, handleEmailLogin } from '../services/authService';
import googleLogo from '../images/google-logo.png'; // Make sure to add the Google logo image in the assets folder
import SignupModal from './SignupModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AuthModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [userType, setUserType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSetUserTypeAndEmailLogin = async () => {
        try {
            const user = await handleEmailLogin(email, password);
            if (user) {
                setUserType(user.userType);
                onClose();
            }
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Login failed', error);
        }
    };

    const handleSetUserTypeAndGoogleLogin = async () => {
        try {
            const user = await handleGoogleLogin();
            if (user) {
                setUserType(user.userType);
                onClose();
            }
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Login failed', error);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                    <button
                        className="absolute top-6 right-6 text-gray-700 hover:text-gray-900"
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                    <h2 className="text-2xl mb-4">Login</h2>
                    
                    {errorMessage && (
                        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                            {errorMessage}
                        </div>
                    )}
                    
                    <div className="mb-6">
                        <div className="flex justify-center items-center mb-4">
                            <div className="flex items-center cursor-pointer mx-2" onClick={handleSetUserTypeAndGoogleLogin}>
                                <img src={googleLogo} alt="Google Login" className="w-10 h-10 object-contain" />
                                <span className="ml-2">Login with Google</span>
                            </div>
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-2 border rounded-md w-full mb-2"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-4 py-2 border rounded-md w-full mb-2"
                        />
                        <button
                            className="text-white bg-orange-700 hover:bg-orange-800 inline-flex items-center justify-center w-full px-6 py-3 shadow-xl rounded-xl mb-2"
                            onClick={handleSetUserTypeAndEmailLogin}
                        >
                            Login with Email
                        </button>
                    </div>

                    <div className="mt-4 text-center">
                        <span className="text-gray-700">Don't have an account? </span>
                        <div className="flex justify-center items-center">
                            <button
                                className="text-blue-700 hover:underline mr-4"
                                onClick={() => {
                                    setUserType('business');
                                    setIsSignupModalOpen(true);
                                }}
                            >
                                Signup as Business
                            </button>
                            <button
                                className="text-blue-700 hover:underline"
                                onClick={() => {
                                    setUserType('student');
                                    setIsSignupModalOpen(true);
                                }}
                            >
                                Signup as Student
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} userType={userType} />
        </>
    );
};

export default AuthModal;