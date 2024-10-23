export async function getData(url) {
    const baseUrl = 'http://localhost:3002/api/v1';
    try {
        const response = await fetch(`${baseUrl}/${url}`,{
            cache:'no-store'
        });
        const data = await response.json();
        console.log("🚀 ==> file: getData.js:8 ==> getData ==> data:", data);

        return data;
    } catch (error) {
        console.log(error)
    }
}