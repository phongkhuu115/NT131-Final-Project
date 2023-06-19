import React, { useState, useEffect } from 'react';
import { DailyWaterLevel } from '../../global/type';
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getLocalStorageData } from '../../global/function';

const AreaChart = (props: any) => {
  const data: DailyWaterLevel[] = props.data;
  const labels: string[] = data.map((item) =>
    new Date(item.timeStamp).toDateString()
  );

  const dataOption = props.dataOption;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: props.chartName,
      },
    },
  };

  const limitData = getLocalStorageData('limit')
    ? getLocalStorageData('limit')
    : -30;

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

  let dataset = [
    ...(dataOption === 'temp'
      ? [
          {
            label: 'Temperature',
            fill: true,
            data: data.map((item) => item.tempature).slice(-limitData),
            backgroundColor: 'rgba(244, 80, 80, 0.5)',
            borderColor: 'rgb(244, 80, 80)',
            borderWidth: 2,
            pointRadius: 0,
          },
        ]
      : []),
    ...(dataOption === 'water'
      ? [
          {
            label: 'WaterLevel',
            fill: true,
            data: data.map((item) => item.waterLevel).slice(-limitData),
            backgroundColor: 'rgba(25, 167, 206, 0.5)',
            borderColor: 'rgb(25, 167, 206)',
            borderWidth: 2,
            pointRadius: 0,
          },
        ]
      : []),
    ...(dataOption === 'humid'
      ? [
          {
            label: 'Humidity',
            fill: true,
            data: data.map((item) => item.humidity).slice(-limitData),
            backgroundColor: 'rgba(255, 217, 90, 0.5)',
            borderColor: 'rgb(255, 217, 90)',
            borderWidth: 2,
            pointRadius: 0,
          },
        ]
      : []),
  ];

  const chartConfig = {
    labels: labels.slice(-limitData),
    datasets: dataset,
  };

  return (
    <>
      <div className='m-auto'>
        <Line options={options} data={chartConfig}></Line>
      </div>
    </>
  );
};

export default AreaChart;
