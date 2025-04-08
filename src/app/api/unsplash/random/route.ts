export async function GET (request: Request) {
    const accessKey: string = process.env.UNSPLASH_API_ACCESS_KEY as string;

    const url: URL = new URL(request.url);
    const query: string = url.searchParams.get('query') || 'random';

    const res = await fetch(`https://api.unsplash.com/photos/random?query=${query}`, {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      });
    
    const data = await res.json();
    return Response.json(data);
}