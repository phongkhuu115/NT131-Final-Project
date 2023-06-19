import React, { useState, useEffect, FormEvent } from 'react';
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../../global/function';
import { SettingData } from '../../global/type';
import { pageName } from '../../global/varable';
import Sidebar from '../sidebar/SideBar';

const Setting = (props: any) => {
  const [setting, setSetting] = useState<SettingData>({
    limit: 0,
  });

  useEffect(() => {
    document.title = pageName + 'Setting';
    return () => {};
  }, []);

  const submitData = (e: FormEvent): void => {
    e.preventDefault();
    for (let [key, value] of Object.entries(setting)) {
      setLocalStorageData(String(key), value);
    }
  };

  return (
    <>
      <div className='flex gap-3'>
        <Sidebar></Sidebar>
        <main className='flex flex-col gap-5 flex-[8] mt-10 mx-10 text-[18px] font-raleway'>
          <form onSubmit={(e) => submitData(e)} className='flex flex-col gap-3'>
            <div className='flex'>
              <label htmlFor='limit' className='w-[200px]'>
                Limit Data on Chart
              </label>
              <input
                type='text'
                name='limit'
                id='limit'
                defaultValue={
                  getLocalStorageData('limit')
                    ? getLocalStorageData('limit')
                    : 0
                }
                className='border-[1px] border-[#ccc] rounded-md focus:outline-none px-3 font-sans'
                onChange={(e) =>
                  setSetting({
                    ...setting,
                    [e.target.id]: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <input
                type='submit'
                value='Save Change'
                className='py-2 px-4 bg-[#19A7CE] text-white font-[600] rounded-md cursor-pointer active:bg-[#146C94]'
              />
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default Setting;
