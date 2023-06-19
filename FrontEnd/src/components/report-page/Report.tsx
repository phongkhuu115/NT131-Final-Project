import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/SideBar';

const Report = (props: any) => {
  const [state, setState] = useState('');

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <main id='report' className='flex'>
        <Sidebar></Sidebar>
        <div className='flex flex-[8] items-center justify-center'>
          <form action="" className='flex flex-col gap-5'>
            <div className='flex items-center gap-6'>
              <label className='w-[100px]' htmlFor="status">Status</label>
              <input className='w-[150px] focus:outline-none border-[1px] border-[#aaa] p-1 rounded-md' type="number" name="status" id="status" min={0} max={1}/>
            </div>
            <div className='flex items-center gap-6'>
              <label className='w-[100px]' htmlFor="date">Date</label>
              <input className='w-[150px] focus:outline-none border-[1px] border-[#aaa] p-1 rounded-md' type="date" name="date" id="date"/>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Report;
