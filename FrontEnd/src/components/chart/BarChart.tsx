import React, { useState, useEffect } from 'react';
import { DailyWaterLevel } from '../../global/type';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getLocalStorageData } from '../../global/function';

const BarChart = (props: any) => {
  const data: DailyWaterLevel[] = props.data;
  const labels: string[] = data.map((item) =>
    new Date(item.timeStamp).toDateString()
  );

  const limitData = getLocalStorageData('limit')
    ? getLocalStorageData('limit')
    : -30;

  Chart.register(CategoryScale);

  const chartConfig = {
    labels: labels.slice(-limitData),
    datasets: [
      {
        label: 'Water Level',
        data: data.map((item) => item.waterLevel).slice(-limitData),
        backgroundColor: 'rgb(25, 167, 206)',
        borderColor: 'black',
        borderWidth: 1,
      },
      {
        label: 'Temperature',
        data: data.map((item) => item.tempature).slice(-limitData),
        backgroundColor: '#FF8E9E',
        borderColor: 'black',
        borderWidth: 1,
      },
      {
        label: 'Humidity',
        data: data.map((item) => item.humidity).slice(-limitData),
        backgroundColor: '#FFD95A',
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className='m-auto'>
        <Bar
          options={{
            plugins: { title: { display: true, text: 'Water Level Tracking' } },
          }}
          data={chartConfig}></Bar>
      </div>
    </>
  );
};

export default BarChart;
