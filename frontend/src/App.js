import { useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Nav from './components/Mainpage/Nav'
import Top from './components/Mainpage/Top'
import { Login, Signup, PasswordFind} from './pages'

function App() {
  const location = useLocation().pathname
  const isLogin = localStorage.getItem('accessToken') ? true : false
  useEffect(() => {
  }, [location])

  if (!isLogin) {
    return <Navigate to="/login" replace={true} />
  }

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
