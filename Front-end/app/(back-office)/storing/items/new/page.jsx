"use client"
import React, { useEffect, useState } from 'react';
import FormHeader from '../../../../../Components/dashboard/FormHeaders';
import CreateItemFrom from '@/Components/dashboard/Forms/CreateItemFrom';
import { getData } from "@/actions/storeActions/StoreGeneralCrudRequests/getData";

export default function NewItem(props) {
  
  const { initialData, isupdate } = props;

  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [brands, setBrands] = useState([]);

  const [warehouses, setWarehouses] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [CategoriesData, UnitsData, BrandData, WareHouseData, SupplierData] = await Promise.all([
          getData('category'),
          getData('unit'),
          getData('brands'),
          getData('WareHouse'),
          getData('supplier')
        ]);

        setCategories(CategoriesData.category);
        setUnits(UnitsData.unit);
        setBrands(BrandData.brands);
        setWarehouses(WareHouseData.WareHouse);
        setSuppliers(SupplierData.supplier);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts.
  console.log("🚀 ==> file: page.jsx:13 ==> NewItem ==> brands:", suppliers);

  return (
    <div>
      <FormHeader title={`${isupdate ? 'Update Item' : 'New Item'}`} link={'/dashboard/inventory/items'} />

      <CreateItemFrom
        categories={categories}
        units={units}
        brands={brands}
        warehouses={warehouses}
        suppliers={suppliers}
        initialData={initialData}
        isupdate={isupdate}
      />
    </div>
  );
}
