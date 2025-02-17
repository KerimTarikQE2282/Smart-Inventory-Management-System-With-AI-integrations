'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useWarehouseData() {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWarehouses() {
      try {
        const { data } = await axios.get('http://localhost:3002/api/v1/WareHouse/');
        const warehousesArray = data?.data?.WareHouse || [];

        const warehouseDetailsArray = await Promise.all(
          warehousesArray.map(async (warehouse) => {
            try {
              const response = await axios.get(
                `http://localhost:3002/api/v1/WareHouse/wareHouseItemsDetailed/${warehouse._id}`
              );
              return response.data;
            } catch (err) {
              console.error(`❌ Error fetching warehouse ${warehouse._id}:`, err);
              return null;
            }
          })
        );

        setWarehouses(warehouseDetailsArray.filter(Boolean));
      } catch (err) {
        setError(err);
        console.error('Error fetching warehouse data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchWarehouses();
  }, []);

  return { warehouses, loading, error };

}
