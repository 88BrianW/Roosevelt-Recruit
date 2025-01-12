import React, { useState } from 'react';
import { handleGoogleSignup, handleEmailSignup } from '../services/authService';
import googleLogo from '../images/google-logo.png'; // Make sure to add the Google logo image in the assets folder
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const SignupModal = ({ isOpen, onClose, userType }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleGoogleSignupClick = async () => {
        try {
            await handleGoogleSignup(userType);
            onClose();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleEmailSignupClick = async () => {
        try {
            await handleEmailSignup(email, password, userType);
            onClose();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <button
                    className="absolute top-6 right-6 text-gray-700 hover:text-gray-900"
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
                <h2 className="text-2xl mb-4">Signup as {userType.charAt(0).toUpperCase() + userType.slice(1)}</h2>

                {errorMessage && (
                        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                            {errorMessage}
                        </div>
                    )}
                
                <div className="mb-6">
                    <div className="flex justify-center items-center mb-4">
                        <div className="flex items-center cursor-pointer mx-2" onClick={() => handleGoogleSignupClick(userType)}>
                            <img src={googleLogo} alt="Google Signup" className="w-10 h-10" />
                            <span className="ml-2">Signup with Google</span>
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
                        onClick={() => handleEmailSignupClick(email, password, userType)}
                    >
                        Signup with Email
                    </button>
                </div>

                <button
                    className="text-gray-700 hover:text-gray-900 mt-4"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SignupModal;