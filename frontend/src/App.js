import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Nav from './components/Mainpage/Nav'
import Top from './components/Mainpage/Top'
import { Login, Signup, PasswordFind} from './pages'

function App() {
  const location = useLocation().pathname

  useEffect(() => {
  }, [location])

  return (

    <div className="App">
      {
        location === '/Login' | location === '/login' ? <Login/>
        : location === '/signup' | location === '/Signup' ? <Signup/>
        : location === '/passwordFind' | location === '/PasswordFind' ? <PasswordFind/>
        :
        <div className="App-container">
          <div className="App-nav"><Nav /></div>
          <div className="App-page">
            <Top />
            <Outlet />
          </div>
        </div>
      }
    </div>
  );
}

export default App;
