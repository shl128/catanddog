import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
import SERVER from '../../API/server';
import { withRouter, Link } from 'react-router-dom';
import emailjs from 'emailjs-com'

function Signup() {

    const [Email, setEmail] = useState('');
    const [NickName, setNickName] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPasword, setConfirmPasword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [emailConfirm, setEmailConfirm] = useState(false);
    const [nickNameConfirm, setnickNameConfirm] = useState(false);
    
    const templateParams = {
      email: Email,
      notes: 'Check this out!'
    };

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
      };
    
    const onNickNameHandler = (e) => {
    setNickName(e.target.value);
    };

    const onPasswordHanlder = (e) => {
    setPassword(e.target.value);
    if (e.target.value == '' && Password == '') {
        setPasswordError(false);
    }
    };

    const onConfirmPasswordHandler = (e) => {
        setConfirmPasword(e.currentTarget.value);
        setPasswordError(e.target.value !== Password);
        if (e.currentTarget.value == '' && Password == '') {
          setPasswordError(false);
        }
    }; 

    const sendEmail = (e) => {
      e.preventDefault();
      console.log(templateParams)
      emailjs.send(
        'service_sangwoo',
        'template_5rbudkm',
        templateParams,
        'user_LEBGlHpyf8P6UlU2H8lm9'
        ).then(res => {
          console.log('성공')
        }).catch(error => (console.log(error)))
    }

    const onSubmitHandler = (e) => {
      console.log(e)
        e.preventDefault();
        if (Email === '') {
          alert('이메일을 입력해 주세요');
          return;
        }
        if (Email.length > 100) {
          alert('이메일이 너무 길어요');
          return;
        }
        if (NickName === '') {
          alert('이름을 입력해 주세요');
          return;
        }
        if (NickName.length > 20) {
          alert('이름이 너무 길어요');
          return;
        }
        if (Password === '') {
          alert('비밀번호를 입력해 주세요');
          return;
        }
        if (Password.length < 8) {
            alert('비밀번호는 8자 이상입니다.');
            return;
        }
        if (Password.length > 16) {
            alert('비밀번호는 16자 이하입니다.');
            return;
        }
        if (ConfirmPasword === '') {
          alert('확인 비밀번호를 입력해 주세요');
          return;
        }
    
        if (Password === ConfirmPasword) {
          //수정 console.log(Name);
          //수정 console.log(Email);
    
          const body = {
            email: Email,
            name: NickName,
            confirm_password: ConfirmPasword,
            password: Password,
          };
          // dispatch(registerUser(body)).then((res) => {
          //   //수정 console.log(res);
          //   alert('가입이 정상적으로 완료되었습니다');
          //   props.history.push('/login');
          // });
          axios
            .post(
              SERVER.BASE_URL + SERVER.ROUTES.signup,
              {
                email: Email,
                password: Password,
                confirm_password: ConfirmPasword,
                name: NickName,
              },
              { withCredentials: true },
            )
            .then(function (response) {
              //수정 console.log(response);
              alert('가입이 정상적으로 완료되었습니다');
            //   props.history.push('/login');
            })
            .catch(function (error) {
              //수정 console.log(error);
            });
        } else {
          setPasswordError(true);
          alert('비밀번호가 일치하지 않습니다');
        }
        
    };
    return (
        <div className="background">
          <div className="container-register100">
            <div className="wrap-register"></div>
            <div className="wrap-register100">
              <form className="register100-form validate-form" onSubmit={onSubmitHandler}>
                <div className="wrap-input100 validate-input" data-validate="Enter useremail">
                    <input className="input100" type="email" name="Email" placeholder="Email" value={Email} onChange={onEmailHandler} />
                    <span className="focus-input100" data-placeholder="&#xf15a;"></span>
                    <button onClick={sendEmail}>이메일 확인</button>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Enter username">
                  <input className="input100" type="nickname" name="nickname" placeholder="NickName" value={NickName} onChange={onNickNameHandler} />
                  <span className="focus-input100" data-placeholder="&#xf207;"></span>
                  <button>중복 확인</button>
                </div>
    
                <div className="wrap-input100 validate-input" data-validate="Enter username">
                  <input className="input100" type="password" name="password" placeholder="Password" value={Password} onChange={onPasswordHanlder} />
                  <span className="focus-input100" data-placeholder="&#xf190;"></span>
                </div>
    
                <div className="wrap-input100 validate-input" data-validate="Enter password">
                  <input className="input100" type="password" name="password" value={ConfirmPasword} placeholder="Confirm Password" onChange={onConfirmPasswordHandler} />
    
                  <span className="focus-input100" data-placeholder="&#xf191;"></span>
                  {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
                </div>
    
                <div className="container-login100-form-btn justify-content-around">
                  <button className="login100-form-btn" type="submit">
                    회원가입
                  </button>
                  <Link to="/login">
                    <button className="login100-form-btn">돌아가기</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
  }

export default Signup;