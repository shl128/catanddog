import React, { useState } from 'react';
import axios from 'axios';
import SERVER from '../../API/server';
import './Login.css'
import logo from '../../components/image/로고.png'
import { Link, useNavigate  } from 'react-router-dom';
import kakaoLoginBtn from '../../components/image/kakaoLoginBtn.png'

function Login() {
    const REST_API_KEY = "81167858a8e7e297800ffaee4b944bcc";
    const REDIRECT_URI = "http://localhost:3000/kakaoOAuth";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    let navigate = useNavigate();

    const onEmailHandler = (e) => {
      setEmail(e.currentTarget.value);
    };
    const onPasswordHanlder = (e) => {
      setPassword(e.currentTarget.value);
    };
  
    const onSubmitHandler = (e) => {
      e.preventDefault();
      // console.log(Email, Password)
      if (localStorage.getItem('accessToken') != null) {
        localStorage.removeItem('accessToken');
      }
  
      axios
        .post(
          SERVER.BASE_URL + SERVER.ROUTES.login,
          {
            userEmail: Email,
            userPassword: Password,
          }
        )
        .then(function (response) {
            console.log(response.data)
            localStorage.setItem('accessToken', response.data.accessToken);

            window.location.replace(`/`)
            // return(
            //   navigate('/main')
            // )
        })
        .catch(function (error) {
          alert('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다');
          // //수정 console.log(error);
        });
    };
    return (
      <div className='ground'>
      <div className="Login">
        <div className='card'>
          <div className='container'>
            <div className='row'>
              <div className='col-4'>
            
                <img className='loginLogoImg' src={logo} alt='logo' width="100%" />
              </div>
              <div className='col-8 right'>
                <div className="login">
                  <div className='customcontainer'>
                    <h4>냥과함개와 함께하세요!
                    </h4>
                  </div>
                <form onSubmit={onSubmitHandler}>
                  <div className="cflex">
                      <ul className="customcontainer">
                          <li className="item center">
                          </li>
                          <li className="item">
                            <input className='emailInput' type="email" name="Email" placeholder="Email" value={Email} onChange={onEmailHandler} autoFocus required></input>
                          </li>
                      </ul>
                      <ul className="customcontainer">
                        <li className="item center">
                        </li>                    
                        <li className="item ">
                          <input className='emailInput' type="password" name="password"  value={Password} autoComplete="off" placeholder="Password" onChange={onPasswordHanlder} autoFocus required></input>
                        </li>
                      </ul>
                      <ul className="customcontainer">
                        <li className="item center">
                        </li>                    
                        <li className="item ">
                          <button className='submit'>Login</button>
                        </li>
                      </ul>
                      <ul className="customcontainer">
                        <li className="item center">
                        </li>   
                        <li className="item">
                          <ul className='customcontainer'>
                            <li className="item center google">
                          
                            </li>                    
                            <li className="item ">
                              <a href={KAKAO_AUTH_URL}><img src={kakaoLoginBtn} alt=""></img></a>
                            </li>

                          </ul>
                        </li>
                      </ul>
                      <ul className="customcontainer">
                        <li className="item center">
                        </li>                    
                        <li className="item passwordFind">
                          <Link to="/passwordFind" className='back'>
                            <div>비밀번호를 잊으셨나요?</div>
                          </Link>
                          <br/>
                          <Link to="/signup" className='back signup'>
                            <div>회원가입</div>
                          </Link>
                        </li>
                        <li className="item passwordFind">
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
    );
  }

export default Login;