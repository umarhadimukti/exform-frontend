"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "@/types/authContextTypes";
import { redirect, useRouter } from "next/navigation";

// create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// create AuthProvider
export const AuthProvider = ({ children }: { children: React.ReactNode }) =>
{
    // define state
    const [ user, setUser ] = useState<User | null>(null);
    const [ error, setError ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ initialized, setInitialized ] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async (): Promise<void> => {
            try {
                setLoading(true);
                const response = await fetch('/source/v1/current-user', {
                    credentials: 'include'
                });
    
                const data = await response.json();
                
                if (data.status && data.userInformation) {
                    setUser(data.userInformation);
                } else {
                    setUser(null);
                }
            } catch (error) {
                const errorMessage: string = `failed to fetch current user: ${error instanceof Error ? error.message : error as string}`;
                setError(errorMessage);
                setUser(null);
            } finally {
                setLoading(false);
                setInitialized(true);
            }
            
        };

        fetchUser();

    }, []);

    const logout = async (): Promise<boolean> => {
        try {
            setLoading(true);
            const response = await fetch ('/api/logout', {
                method: 'POST',
                credentials: 'include',
            });

            const resJson = await response.json();

            if (resJson.status) {
                setUser(null);
                router.push('/login');
            }

            return true;
        } catch (error) {
            const errorMessage: string = error instanceof Error ? error.message : error as string;
            setError(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => setError(null);

    const authValues: AuthContextType = {
        user, setUser, logout, error, clearError, loading, initialized
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