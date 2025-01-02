

export async function getDataById(url,id){
    const baseUrl = 'http://localhost:3000/api';
   
    try {
        const response = await fetch(`${baseUrl}/${url}/${id.id}`,{
            cache:'no-store'
        });
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

