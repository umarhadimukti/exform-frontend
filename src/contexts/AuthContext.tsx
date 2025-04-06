"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "@/types/authContextTypes";
import { redirect, useRouter } from "next/navigation";
import Cookies from "js-cookie";

// get cookies
const getTokenFromCookies = (): string | undefined => {
    return Cookies.get('accessToken');
}

// create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// create AuthProvider
export const AuthProvider = ({ children }: { children: React.ReactNode }) =>
{
    // define state
    const [ user, setUser ] = useState<User | null>(null);
    const [ error, setError ] = useState<string | null>(null);
    const router = useRouter();

    const logout = async (): Promise<boolean> => {
        try {
            const response = await fetch ('/api/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.status) {
                router.push('/login');
            }

            return true;
        } catch (error) {
            const errorMessage: string = error instanceof Error ? error.message : error as string;
            setError(errorMessage);
            return false;
        }
    };

    const clearError = () => setError(null);

    const authValues: AuthContextType = {
        user, setUser, logout, error, clearError,
    }

    return (
        <AuthContext.Provider value={ authValues }>
          {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};