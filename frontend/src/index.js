import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Mypage, Signup, Login, PasswordFind, Petpage, Main } from './pages/index'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="main" element={<Main />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="passwordFind" element={<PasswordFind />} />
        <Route path="petpage" element={<Petpage />} />
      </Route>
    </Routes>
    <div>
    <header></header>
    <Outlet />  {/* MemberInfo의 component가 Outlet의 위치에 위치하게 된다. */}
  </div>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
