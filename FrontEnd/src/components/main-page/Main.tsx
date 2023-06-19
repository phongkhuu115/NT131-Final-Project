import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/SideBar';
import BarChart from '../chart/BarChart';
import { getRequest } from '../../global/api';
import { DailyWaterLevel } from '../../global/type';
import { pageName } from '../../global/varable';
import { io } from 'socket.io-client';

const Main = (props: any) => {
  const [data, setData] = useState([]);

  const socket = io('http://localhost:3333');

  useEffect(() => {
    getRequest('getData').then((res) => setData(res.data.data));
    document.title = pageName + 'Overview';

    socket.on('newData', () => {
      getRequest('getData').then((res) => setData(res.data.data));
    });
    return () => {};
  }, []);

  return (
    <>
      <div className='flex gap-3'>
        <Sidebar></Sidebar>
        <main className='flex-[8] my-auto mx-10'>
          <BarChart data={data}></BarChart>
        </main>
      </div>
    </>
  );
};

export default Main;
