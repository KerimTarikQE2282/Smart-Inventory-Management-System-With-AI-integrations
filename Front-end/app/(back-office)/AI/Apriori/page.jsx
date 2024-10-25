"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const FrequentItemsetsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/apriori');
        const transformedData = response.data.frequent_itemsets.map(item => ({
          item: item.itemsets[0],
          support: item.support,
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-96">
      <h2 className="text-center text-lg font-semibold mb-4">Frequent Itemsets Support By Apriori</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="item" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="support" fill="#4a90e2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FrequentItemsetsChart;
