import React, { useState } from 'react';
import axios from 'axios';
import SERVER from '../../API/server';
import './Login.css'
import { Link  } from 'react-router-dom';

function Login() {
    const REST_API_KEY = "81167858a8e7e297800ffaee4b944bcc";
    const REDIRECT_URI = SERVER.REDIRECT_URI + "kakaoOAuth";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

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
      <div className="Login-page">
        <div className="Login">
          <img className="Login-logo" src={process.env.PUBLIC_URL + '/image/logo.png'} alt='logo' width="100%" />
          <div className="Login-content">
            <h4>냥과함개와 함께하세요!</h4>
            <form className="Login-form" onSubmit={onSubmitHandler}>
              <input className="Login-form-item" type="email" name="Email" placeholder="Email" value={Email} onChange={onEmailHandler} autoFocus required></input>
              <input className="Login-form-item" type="password" name="password"  value={Password} autoComplete="off" placeholder="Password" onChange={onPasswordHanlder} autoFocus required></input>
              <button className="Login-button">Login</button>
              <a href={KAKAO_AUTH_URL}>
                <img src={process.env.PUBLIC_URL + '/image/kakaoLoginBtn.png'} alt="" style={{borderRadius: "16px"}}></img>
              </a>
              <div className="Login-link">
                <Link to="/signup" className="Login-link-item">회원가입</Link>
                <Link to="/passwordFind" className="Login-link-item">비밀번호를 잊으셨나요?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

export default Login;