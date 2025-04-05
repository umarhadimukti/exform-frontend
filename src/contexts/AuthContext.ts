import { createContext, useState, useEffect } from "react";
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
                const response = await fetch('http://localhost:3002/api/v1/current-user');

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                }
    
                setLoading(false);
            } catch (error) {
                setLoading(false);
                throw new Error(`authentication check failed: ${error instanceof Error ? error.message : error}`);
            }
        }

        checkUserLoggedIn();
    }, [])



}