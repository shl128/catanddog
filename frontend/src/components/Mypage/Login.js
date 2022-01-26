import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
import SERVER from '../../API/server';


function Login() {

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
  
      if (localStorage.getItem('Authorization') != null) {
        localStorage.removeItem('Authorization');
      }
      console.log(Email, Password)
      const body = {
        email: Email,
        password: Password,
      };
  
      axios
        .post(
          SERVER.BASE_URL + SERVER.ROUTES.login,
          {
            email: Email,
            password: Password,
          },
          { withCredentials: true },
        )
        .then(function (response) {
          if (response.status == 200) {
            localStorage.setItem('Authorization', 'JWT ' + response.data.token);
            alert('로그인이 정상적으로 완료되었습니다');

          }
        })
        .catch(function (error) {
          alert('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다');
          // //수정 console.log(error);
        });
    };
    return (
      <div className="background" role="group" aria-label="actionButtons">
        <div className="container-login100">
          <div className="wrap-login"></div>
          <div className="wrap-login100">
            <form className="login100-form"  onSubmit={onSubmitHandler}>
  
  
              <div className="wrap-input100 " data-validate="Enter username">
                <input className="input100" type="email" name="Email" placeholder="Email" value={Email} onChange={onEmailHandler} />
                <span className="focus-input100" data-placeholder="&#xf207;"></span>
              </div>
  
              <div className="wrap-input100 " data-validate="Enter password">
                <input className="input100" type="password" name="password"  value={Password} autoComplete="off" placeholder="Password" onChange={onPasswordHanlder} />
                <span className="focus-input100" data-placeholder="&#xf191;"></span>
              </div>
  
              <div className="container-login100-form-btn justify-content-around">
                <button className="login100-form-btn" type="submit">
                  로그인
                </button>
                {/* <button className="login100-form-btn" onClick={() => redirectToRegister()} >
                  회원가입
                </button> */}
              </div>
              {/* <div className="text-center p-t-30">
                <a className="txt1" href="#">
                  Forgot Password?
                </a>
              </div> */}
            </form>
          </div>
        </div>
        <div>
          <Alert variant="success">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
              Aww yeah, you successfully read this important alert message. This example
              text is going to run a bit longer so that you can see how spacing within an
              alert works with this kind of content.
            </p>
            <hr />
            <p className="mb-0">
              Whenever you need to, be sure to use margin utilities to keep things nice
              and tidy.
            </p>
          </Alert>
        </div>
        <button className="btn btn-success">sss </button>
      </div>
    );
  }

export default Login;