import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Signup, Login} from './components/Mypage'
import Mypage from './components/Mypage/Mypage'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        기본
        <Mypage id="sw"/>
        <Routes>
          <Route path="/signup" value="회원가입" element={<Signup />}/>
          <Route path="/login" value="로그인" element={<Login />}/>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
