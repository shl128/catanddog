import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Mypage, Signup, Login, PasswordFind, Petpage, Main, Chat, SpendingOfMonthpage, Calendarpage, Emoji, Cartoon, Chatting } from './pages/index'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="main" element={<Main />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="petpage" element={<Petpage />} />
        <Route path="Chat" element={<Chat />} />
        <Route path="spendingOfMonth" element={<SpendingOfMonthpage />} />
        <Route path="calendarpage" element={<Calendarpage />} />
        <Route path="emoji" element={<Emoji />} />
        <Route path="cartoon" element={<Cartoon />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/passwordFind" element={<PasswordFind />} />
      <Route path="/chatting/:chatroomId" element={<Chatting/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// registerServiceWorker();
