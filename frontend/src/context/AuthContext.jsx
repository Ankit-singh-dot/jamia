import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    const API_URL = "http://localhost:5001/api/auth";

    // Initialize Auth State
    useEffect(() => {
        const verifyUser = async () => {
            if (token) {
                try {
                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    const res = await axios.get(`${API_URL}/me`);
                    setUser(res.data);
                } catch (error) {
                    console.error("Auth verification failed", error);
                    logout();
                }
            }
            setLoading(false);
        };
        verifyUser();
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/login`, { email, password });
            const { token, ...userData } = res.data;
            localStorage.setItem("token", token);
            setToken(token);
            setUser(userData);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.error || "Login failed" };
        }
    };

    const signup = async (name, email, password) => {
        try {
            const res = await axios.post(`${API_URL}/register`, { name, email, password });
            const { token, ...userData } = res.data;
            localStorage.setItem("token", token);
            setToken(token);
            setUser(userData);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.error || "Signup failed" };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
