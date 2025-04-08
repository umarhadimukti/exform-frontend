export const getRandomImage = async (query: string) =>
{
    const url: string = `https://api.unsplash.com/photos/random?query=${query}`;

    const res = await fetch(url, {
        headers: { 'Authorization': `Client-ID ${process.env.UNSPLASH_API_ACCESS_KEY}` },
        cache: 'no-cache',
    });

    if (!res.ok) throw new Error('unsplash API failed: ' + res.status);

    return res.json();
}