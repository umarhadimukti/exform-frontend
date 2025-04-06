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
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);
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
                    console.log('masuk')
                    console.log(data)
                    setUser(data);
                } else {
                    if (response.status === 401) {
                        console.error('user not authenticated');
                    } else {
                        setError('authentication check failed: ' + response.status);
                    }
                }
            } catch (error) {
                const errorMessage: string = error instanceof Error ? error.message : String(error);
                console.error(errorMessage);
                setError(`authentication check failed: ${errorMessage}`);
            } finally {
                setLoading(false);
            }
        }

        checkUserLoggedIn();
    }, [])

    const logout = async (): Promise<boolean> => {
        try {
            const response = await fetch('http://localhost:3002/logout', {
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
                return true;
            } else {
                setError(data.message || 'logout failed');
                return false;
            }
        } catch (error) {
            const errorMessage: string = error instanceof Error ? error.message : String(error);
            console.error(`failed to logout: ${errorMessage}`);
            setError(`failed to logout: ${errorMessage}`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => setError(null);

    const authValues: AuthContextType = {
        user, setUser, loading, logout, error, clearError,
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