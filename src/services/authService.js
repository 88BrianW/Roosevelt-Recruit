import { auth, db } from '../firebaseconfig';
import { signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            return { ...user, userType: userDoc.data().userType };
        } else {
            throw new Error('User document does not exist');
        }
    } catch (error) {
        console.error("Error logging in: ", error);
        throw error;
    }
};

const handleGoogleSignup = async (userType) => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            userType: userType
        });
    } catch (error) {
        console.error("Error signing up: ", error);
        throw error;
    }
};

const handleEmailSignup = async (email, password, userType) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            userType: userType
        });
    } catch (error) {
        console.error("Error signing up: ", error);
        throw error;
    }
};

const handleEmailLogin = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            return { ...user, userType: userDoc.data().userType };
        } else {
            throw new Error('User document does not exist');
        }
    } catch (error) {
        console.error("Error logging in: ", error);
        throw error;
    }
};

const handleLogout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error logging out: ", error);
        throw error;
    }
};

export { handleGoogleLogin, handleGoogleSignup, handleEmailSignup, handleEmailLogin, handleLogout };