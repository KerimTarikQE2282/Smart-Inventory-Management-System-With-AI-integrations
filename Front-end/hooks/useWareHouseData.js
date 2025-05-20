import { useState, useEffect } from "react";
import axios from "axios";

export const useWarehouseData = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://smart-inventory-management-system-with-a1f2.onrender.com/api/v1/WareHouse/');
        const warehousesArray = data?.WareHouse || [];
        console.log("🚀 ==> fetchData ==> data:", data);

        console.log("🚀 ==> fetchData ==> warehousesArray:", warehousesArray);



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
