"use client"
import React from 'react';
import { getData } from "@/actions/storeActions/StoreGeneralCrudRequests/getData";
import NewAdjustments from '@/Components/dashboard/Forms/AdjustmentForm';


export default  function Adjustments() {

  const [item, setItem] = React.useState([]);
  const [wareHouse, setwareHouse] = React.useState([]);
  const [stores, setstores] = React.useState([]);




  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [ WareHouseData, ItemData,StoreData] = await Promise.all([
         
          getData('WareHouse'),
          getData('items'),
          getData('stores'),
        ]);

        setItem(ItemData.items);
        setwareHouse(WareHouseData.WareHouse);
        setstores(StoreData.stores)
      } catch (error) {
        console.error("Error fetching data", error);
      }

    };

    fetchData();
  }, []);
  console.log("🚀 ==> file: page.jsx:8 ==> Adjustments ==> wareHouse:", wareHouse);
  console.log("🚀 ==> file: page.jsx:7 ==> Adjustments ==> item:", item);
  console.log("🚀 ==> file: page.jsx:30 ==> fetchData ==> stores:", stores);

  return(
    <div>
      <NewAdjustments items={item} WareHouses={wareHouse} stores={stores}/>
    </div>
  )
}
