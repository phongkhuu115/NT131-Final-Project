import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './components/main-page/Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Setting from './components/setting-page/Setting'
import Report from './components/report-page/Report'
import Detail from './components/detail-page/Detail'
import User from './components/user-page/User'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Main></Main>}></Route>
          <Route path='setting' element={<Setting></Setting>}></Route>
          <Route path='detail' element={<Detail></Detail>}></Route>
          <Route path='report' element={<Report></Report>}></Route>
          <Route path='user' element={<User></User>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
)
