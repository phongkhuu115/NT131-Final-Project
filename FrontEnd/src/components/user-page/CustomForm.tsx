import React, { useState, useEffect, FormEvent } from 'react';
import { postRequest } from '../../global/api';

const CustomForm = (props: any) => {
  const [action, setAction] = useState(props.preAction);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  console.log(props.preAction)
  const submitAction = (e: FormEvent) => {
    e.preventDefault()
    const url = action === 'login' ? 'login' : 'register'
    let data = {
      username: username,
      password: password
    }
    postRequest(url, data).then(res => {
      if (res.status === 200 || res.status === 201) {
        if (res.status === 201) {
          setAction('login')
        }
        if (res.status === 200) {
          props.loginSuccess(res.data.user.token)
        }
      }
    }).catch(err => console.log(err))
  }
  return (
    <>
      <form className='flex w-[400px] flex-col gap-3' onSubmit={e => submitAction(e)}>
        <div className='flex flex-col gap-3'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            id='username'
            className='p-3 border-[1px] border-[#ccc] rounded-md'
            placeholder='e.g. abc123'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-3'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            className='p-3 border-[1px] border-[#ccc] rounded-md'
            placeholder='••••••••••'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='text-right'>
          <button type='submit' className='py-2 px-4 bg-[#19A7CE] text-white font-[600] rounded-md cursor-pointer active:bg-[#146C94]'>
            {action === 'login' ? 'Login' : 'Register'}
          </button>
        </div>
      </form>
    </>
  );
};

export default CustomForm;
