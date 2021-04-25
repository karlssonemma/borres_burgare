import React, { useContext, useState, useEffect } from 'react';
import firebaseInstance, { auth } from '../config/firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = currentUser !== null && !loading;

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null)
            }
            setLoading(false);
        });
    }, [])

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    };

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)

    };

    const logout = () => {
        auth.signOut()
    };

    const value = {
        currentUser,
        signup,
        login,
        logout,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
};