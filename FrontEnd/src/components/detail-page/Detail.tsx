import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../sidebar/SideBar';
import AreaChart from '../chart/AreaChart';
import { getRequest } from '../../global/api';
import { DailyWaterLevel } from '../../global/type';
import { pageName } from '../../global/varable';
import { io } from 'socket.io-client';

const Main = (props: any) => {
  const [data, setData] = useState<DailyWaterLevel[]>([]);

  const observedDiv = useRef(null);

  const [height, setHeight] = useState();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    getRequest('getData').then((res) => setData(res.data.data));
    document.title = pageName + 'Overview';
    return () => {};
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:3333');
    socket.on('newData', () => {
      getRequest('getData').then((res) => {
        let rawData = [...res.data.data];
        setData(rawData);
        setHeight(rawData[rawData.length - 1].waterLevel);
      });
    });
  }, []);

  return (
    <>
      <div className='flex gap-3'>
        <Sidebar></Sidebar>
        <main className='flex-[8] grid grid-cols-2 my-auto mx-10'>
          <div>
            <AreaChart
              data={data}
              chartName='Water Level'
              dataOption='water'></AreaChart>
          </div>
          <div>
            <AreaChart
              data={data}
              chartName='Tempature'
              dataOption='temp'></AreaChart>
          </div>
          <div>
            <AreaChart
              data={data}
              chartName='Humidity'
              dataOption='humid'></AreaChart>
          </div>
        </main>
      </div>
    </>
  );
};

export default Main;
