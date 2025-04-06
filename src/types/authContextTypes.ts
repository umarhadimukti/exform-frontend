export interface User
{
    firstName: string;
    lastName: string | null;
    fullName: string;
    email: string;
    roleId: number;
}

export interface AuthContextType
{
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => Promise<boolean>;
    loading: boolean;
    error: string | null;
    clearError: () => void;
    token: string | null;
}