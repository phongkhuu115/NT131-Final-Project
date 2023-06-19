import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { getRequest } from '../../global/api';
import Sidebar from '../sidebar/SideBar';
import CustomForm from './CustomForm';

const User = (props: any) => {
  const [showForm, setShowForm] = useState(false);
  const [showTank, setShowTank] = useState(false);
  const [preAction, setPreAction] = useState('register');
  const [height, setHeight] = useState(0);
  const [personalToken, setPersonalToken] = useState('');

  const socket = io('http://localhost:3333');

  const loginSuccess = (token: string) => {
    setShowForm(false);
    setShowTank(true);
    setPersonalToken(token);
    getRequest('userCollection?userToken=' + token).then((res) => {
      let rawData = [...res.data.data];
      console.log(rawData[rawData.length - 1].waterLevel);
      setHeight(rawData[rawData.length - 1].waterLevel);
    });
  };

  useEffect(() => {
    socket.on('personalData', () => {
      getRequest('userCollection?userToken=' + personalToken).then((res) => {
        let rawData = [...res.data.data];
        console.log(rawData[rawData.length - 1].waterLevel);
        setHeight(rawData[rawData.length - 1].waterLevel);
      });
    });
  });

  return (
    <>
      <div className='flex gap-3'>
        <Sidebar></Sidebar>
        <main className='flex gap-5 justify-center items-center flex-[8] mt-10 mx-10 text-[18px] font-raleway'>
          <div className={showForm || showTank ? 'hidden' : 'flex gap-5'}>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setPreAction('login');
              }}
              className='w-[150px] py-2 px-4 bg-[#19A7CE] text-white font-[600] rounded-md cursor-pointer active:bg-[#146C94]'>
              Login
            </button>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setPreAction('register');
              }}
              className='w-[150px] py-2 px-4 bg-[#19A7CE] text-white font-[600] rounded-md cursor-pointer active:bg-[#146C94]'>
              Register
            </button>
          </div>
          <div className={showForm ? '' : 'hidden'}>
            {showForm ? (
              <CustomForm
                preAction={preAction}
                loginSuccess={loginSuccess}></CustomForm>
            ) : (
              <></>
            )}
          </div>
          <div
            className={
              showTank ? 'flex flex-col items-center gap-5 ' : 'hidden'
            }>
            <p className='text-center'>Visualize the tank</p>
            <div className='flex flex-col justify-end border-[3px] w-[350px] border-black border-t-0 h-[250px] rounded-bl-md rounded-br-md'>
              <div
                style={{ height: height }}
                className='bg-[#19a7ce80] max-h-[250px] transition-all'></div>
            </div>
            <p className='font-sans'>
              Use this link to connect:
              http://localhost:3333/v1/api/userCollection with your personal
              token: {personalToken}
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default User;
