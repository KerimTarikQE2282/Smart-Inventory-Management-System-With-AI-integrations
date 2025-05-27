import { useState, useEffect } from "react";
import axios from "axios";

export const useWarehouseData = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const User_role =  JSON?.parse(global?.window?.localStorage.getItem('INVENTORY_USER_TOKEN') || '{}');
  const authentication_token=`Bearer ${User_role}`
  var config = {
    headers: {
      'Content-Type': 'application/json',
      'authorization': authentication_token
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://smart-inventory-management-system-with-a1f2.onrender.com/api/v1/WareHouse/',config);
        const warehousesArray = data?.WareHouse || [];
        console.log("🚀 ==> fetchData ==> data:", data);

        console.log("🚀 ==> fetchData ==> warehousesArray:", warehousesArray);


ff
        const warehouseDetailsArray = await Promise.all(
          warehousesArray.map(async (warehouse) => {
            try {
              const response = await axios.get(
                `https://smart-inventory-management-system-with-a1f2.onrender.com/api/v1/WareHouse/wareHouseItemsDetailed/${warehouse._id}`
              );

              return response.data;
            } catch (err) {
              console.error(`❌ Error fetching warehouse ${warehouse._id}:`, err);

              return null;
            }
          })
        );

        setWarehouses(warehouseDetailsArray);
      } catch (err) {
        console.error("Error fetching warehouse data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }

    };

    fetchData();
  }, []);

  console.log("🚀 ==> useWarehouseData ==> warehouses:", warehouses);

  return { warehouses, loading, error };


};
