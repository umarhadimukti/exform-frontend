interface Role
{
    role: {
        id: number,
        name: string,
    }
}

export interface User extends Role
{
    first_name: string;
    last_name: string | null;
    email: string;
    role_id: number;
}

export interface AuthContextType
{
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => Promise<boolean>;
    error: string | null;
    clearError: () => void;
}