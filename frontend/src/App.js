import { Outlet } from 'react-router-dom';
import './App.css';
import Nav from './components/Mainpage/Nav'
import Top from './components/Mainpage/Top'

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <div className="App-nav"><Nav /></div>
        <div className="App-page">
          <Top />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
