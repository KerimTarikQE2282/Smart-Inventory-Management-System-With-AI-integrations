export async function getData(url) {
    const baseUrl = 'http://localhost:3002/api/v1';
   const User_role =  JSON?.parse(global?.window?.localStorage.getItem('INVENTORY_USER_TOKEN') || '{}');
  const authentication_token=`Bearer ${User_role}`

    try {
        const response = await fetch(`${baseUrl}/${url}`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'authorization': authentication_token // Use correct capitalization for 'Authorization'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("🚀 ==> file: getData.js:8 ==> getData ==> data:", data);

        return data;
    } catch (error) {
        console.log("Error fetching data:", error);
        throw error; // Optionally throw error for handling in calling function
    }
}
