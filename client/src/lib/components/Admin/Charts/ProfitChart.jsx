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

const ProfitChart = ({ ordersChartDetails, userChartDetails }) => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});
  console.log(ordersChartDetails);
  console.log(userChartDetails);

  useEffect(() => {
    if (
      userChartDetails &&
      userChartDetails.months &&
      userChartDetails.values
    ) {
      const labels = userChartDetails.months.map(
        (month) => month.split(" ")[0]
      );

      //   const customers = userChartDetails.values;
      //   const orders = ordersChartDetails.values;

      const customers = [
        200, 150, 180, 200, 50, 60, 192, 90, 20, 220, 150, 450,
      ];
      const orders = [100, 75, 40, 40, 120, 180, 192, 80, 150, 680, 150, 250];

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Total Customers",
            data: customers,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "Total Orders",
            data: orders,
            borderColor: "rgb(102, 255, 102)",
            backgroundColor: "rgb(0, 204, 0)",
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
  }, [userChartDetails]);

  return (
    <div className="w-[400px] h-[400px] md:w-[600px] lg:w-[700px] md:h-[500px] items-center flex flex-col  bg-transparent p-3  md:p-10">
      <Line options={chartOptions} data={chartData} />
      <p className=" mt-3 md:mt-10 text-[20px] font-bold md:text-3xl text-center">
        Monthly Customer Registrations and Orders Placed
      </p>
    </div>
  );
};

export default ProfitChart;
