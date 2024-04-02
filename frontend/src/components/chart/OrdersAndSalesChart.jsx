import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Orders & Sales',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export default function OrdersAndSalesChart({ ordersAndSalesData }) {
  const labels = ordersAndSalesData.map((data) => data.date);

  const data = {
    labels,
    datasets: [
      {
        label: 'Orders',
        data: ordersAndSalesData.map((data) => data.orders),
        borderColor: 'rgb(17, 45, 78)',
        backgroundColor: 'rgba(17, 45, 78, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Sales',
        data: ordersAndSalesData.map((data) => data.sales),
        borderColor: 'rgb(63, 114, 175)',
        backgroundColor: 'rgba(63, 114, 175, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
