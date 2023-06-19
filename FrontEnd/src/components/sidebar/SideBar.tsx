import React, { useState, useEffect } from 'react';
import { CiWavePulse1 } from 'react-icons/ci';
import { AiOutlineSetting } from 'react-icons/ai';
import { TbAnalyze } from 'react-icons/tb';
import { GoReport } from 'react-icons/go';
import { BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Sidebar = (props: any) => {
  return (
    <>
      <aside className='p-5 flex flex-col gap-5 w-[350px] h-screen bg-[#394867] font-raleway text-[#F1F6F9]'>
        <div className='text-center font-[600] text-[22px]'>Water Tracking</div>
        <div>
          <input
            type='text'
            className='bg-[#394867] placeholder-[#DBDFEA] w-full py-2 px-3 border-[0.5px] rounded-lg'
            placeholder='Search'
          />
        </div>
        <h3 className='px-3 font-[600]'>Menu</h3>
        <ul className='flex flex-col gap-5 font-[600]'>
          <Link to='/'>
            <li className='flex gap-3 items-center py-3 px-8 rounded-md cursor-pointer hover:bg-[#7B8FA1] transition-colors'>
              <CiWavePulse1 size={20}></CiWavePulse1>
              Overview
            </li>
          </Link>
          <Link to='/setting'>
            <li className='flex gap-3 items-center py-3 px-8 rounded-md cursor-pointer hover:bg-[#7B8FA1] transition-colors'>
              <AiOutlineSetting size={20}></AiOutlineSetting>
              Setting
            </li>
          </Link>
          <Link to='/detail'>
            <li className='flex gap-3 items-center py-3 px-8 rounded-md cursor-pointer hover:bg-[#7B8FA1] transition-colors'>
              <TbAnalyze size={20}></TbAnalyze>
              Detail
            </li>
          </Link>
        </ul>
        <h3 className='px-3 font-[600]'>Account</h3>
        <ul className='flex flex-col gap-5 font-[600]'>
          <Link to='/report'>
            <li className='flex gap-3 items-center py-3 px-8 rounded-md cursor-pointer hover:bg-[#7B8FA1] transition-colors'>
              <GoReport size={20}></GoReport>
              Report
            </li>
          </Link>
          <Link to='/user'>
            <li className='flex gap-3 items-center py-3 px-8 rounded-md cursor-pointer hover:bg-[#7B8FA1] transition-colors'>
              <BiUserCircle size={20}></BiUserCircle>
              User
            </li>
          </Link>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
