export async function GET (request: Request) {
    const accessKey: string = process.env.UNSPLASH_API_ACCESS_KEY as string;

    try {
        const url: URL = new URL(request.url);
        const query: string = url.searchParams.get('query') || 'random';
        const index: number = Number(url.searchParams.get('index')) || 1;
    
        const res = await fetch(`https://api.unsplash.com/photos/random?query=${query}`, {
            headers: {
              Authorization: `Client-ID ${accessKey}`,
            },
          });
        
        const data = await res.json();
        return Response.json(data);
    } catch (error) {
        const errorMessage: string = `failed to fetch image: ${error instanceof Error ? error.message : error}`;
        return Response.json(errorMessage);
    }
}