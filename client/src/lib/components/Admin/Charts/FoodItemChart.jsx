"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const FoodItemChart = ({ foodItems }) => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});
  console.log(foodItems);

  useEffect(() => {
    if (foodItems && foodItems.months && foodItems.values) {
      const labels = foodItems.months.map((month) => month.split(" ")[0]);
      // const data = foodItems.values;
      const data = [20, 75, 80, 40, 150, 120, 64, 250, 220, 46, 78, 45];

      setChartData({
        labels: labels,
        datasets: [
          {
            fill: true,
            label: "Food Items",
            data: data,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      });

      setChartOptions({
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Total Food Items",
          },
        },
        scales: {
          y: {
            grid: {
              color: "#d7d7d7",
            },
          },
          x: {
            grid: {
              color: "#d7d7d7",
            },
          },
        },
      });
    }
  }, [foodItems]);

  return (
    <div className=" w-[95%] md:w-[50%]  items-center flex flex-col h-[80vh] bg-transparent  p-10">
      <Line options={chartOptions} data={chartData} />
      <p className="mt-10 text-3xl font-bold">
        {" "}
        Total Food Items added to the System
      </p>
    </div>
  );
};

export default FoodItemChart;
