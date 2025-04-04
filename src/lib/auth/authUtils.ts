
export const logoutUser = async () => 
{
    try {
        await fetch('http://localhost:3002/logout', {
            method: 'POST',
            credentials: 'include',
        });
    } catch (error) {
        const errorMessage: string = error instanceof Error ? error.message : error as string;
        console.error(errorMessage)
        throw new Error(errorMessage);
    }
}