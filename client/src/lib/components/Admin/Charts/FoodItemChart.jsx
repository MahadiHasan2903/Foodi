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
    <div className="w-[400px] h-[400px] md:w-[600px] lg:w-[700px] md:h-[500px] items-center flex flex-col  bg-transparent p-3  md:p-10">
      <Line options={chartOptions} data={chartData} />
      <p className=" mt-3 md:mt-10 text-[20px] font-bold md:text-3xl text-center">
        Monthly Trend of Added Food Items
      </p>
    </div>
  );
};

export default FoodItemChart;
