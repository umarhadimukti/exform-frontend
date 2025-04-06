"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "@/types/authContextTypes";
import { useRouter } from "next/navigation";

// create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// create AuthProvider
export const AuthProvider = ({ children }: { children: React.ReactNode }) =>
{
    // define state
    const [ user, setUser ] = useState<User | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {

        const checkUserLoggedIn = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/v1/current-user', {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setUser(data);
                }
    
                setLoading(false);
            } catch (error) {
                const errorMessage: string = error instanceof Error ? error.message : String(error);
                console.error(errorMessage);
                setLoading(false);
                throw new Error(`authentication check failed: ${errorMessage}`);
            }
        }

        checkUserLoggedIn();
    }, [])

    const logout = async (): Promise<void> => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const data = await response.json();
        
            if (data.status) {
                // clear user state
                setUser(null);
                // redirect to login page
                router.push('/login');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            const errorMessage: string = error instanceof Error ? error.message : String(error);
            console.error(`failed to logout: ${errorMessage}`);
            throw new Error(`failed to logout: ${errorMessage}`);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
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