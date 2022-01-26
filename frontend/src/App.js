import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Signup, Login} from './components/Mypage'
import Mypage from './components/Mypage/Mypage'
import Petpage from './components/Petpage/Petpage'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        기본
        <Petpage/>
        <Routes>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
