import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SERVER from '../../API/server';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com'

function Signup() {

    const [Email, setEmail] = useState('');
    const [NickName, setNickName] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPasword, setConfirmPasword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [emailConfirm, setEmailConfirm] = useState(false);
    const [phonNumber, setPhonNumber] = useState('');
    const selectuserList = ["-- 선택 --", "의사", "펫 주인"];
    const [userKind, setUserKind] = useState('');
    const [nickNameConfirm, setnickNameConfirm] = useState(false);
    const [randomNumber, setRandomNumber] = useState('')
    const [confirmNum, setConfirmNum] = useState('')
    const [emailValidation, setEmailValidation] = useState(false);
    const [nicknameValidation, setNicknameValidation] = useState(false);


    useEffect(() => {
      if (phonNumber.length === 10) {
        setPhonNumber(phonNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
      }
      if (phonNumber.length === 13) {
        setPhonNumber(phonNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
      }
    }, [phonNumber]);

    const handleUserKind = (e) => {
      setUserKind(e.target.value);
    };
    const handleConfirmNum = (e) => {
      setConfirmNum(e.target.value);
    };
    const onConfirmNum = (e) => {
      e.preventDefault()
      if (confirmNum == randomNumber){
        setEmailValidation(true)
        setEmailConfirm(false)
        console.log(emailValidation)
      } else {
        alert('문구가 틀렸습니다.')
      }
    }
    const onNicknameConfirm = (e) => {
      e.preventDefault()
      axios
      .get(
        SERVER.BASE_URL + SERVER.ROUTES.nicknameConfirm + NickName,
      )
      .then(function (response) {
        alert('사용 가능한 닉네임 입니다.');
        setNicknameValidation(true)
      })
      .catch((err)=> {
        alert('사용 불가능한 닉네임 입니다.')
      })
      console.log(SERVER.BASE_URL + SERVER.ROUTES.nicknameConfirm + NickName)
    }

    const templateParams = {
      email: Email,
      notes: ''
    };

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };
    
    const onNickNameHandler = (e) => {
    setNickName(e.target.value);
    };

    const handlePhonNumber = (e) => {
      const regex = /^[0-9\b -]{0,13}$/;
      if (regex.test(e.target.value)) {
        setPhonNumber(e.target.value);
      }
    }

    const onPasswordHanlder = (e) => {
    setPassword(e.target.value);
    if (e.target.value === '' && Password === '') {
        setPasswordError(false);
    }
    };

    const onConfirmPasswordHandler = (e) => {
        setConfirmPasword(e.currentTarget.value);
        setPasswordError(e.target.value !== Password);
        if (e.currentTarget.value === '' && Password === '') {
          setPasswordError(false);
        }
    }; 

    const sendEmail = async(e) => {
      e.preventDefault();
      const tempRandomNumber = Math.floor(Math.random() * 9000 + 1000 )
      setRandomNumber(tempRandomNumber)

      // 동기처리를 하고싶은
      templateParams.notes = tempRandomNumber
      
      emailjs.send(
        'service_sangwoo',
        'template_5rbudkm',
        templateParams,
        'user_LEBGlHpyf8P6UlU2H8lm9'
        ).then(res => {
          setEmailConfirm(true)
          alert('인증메일을 보냈습니다. 확인 후 숫자를 입력 바랍니다.')
        }).catch(error => ( alert('인증가능한 이메일 주소를 입력해 주세요')))
    }

    const onSubmitHandler = (e) => {
      console.log(userKind)

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
        if (userKind === '-- 선택 --'){
          alert('종류 선택은 필수입니다.')
          return;
        }
        if (emailValidation === false){
          alert('이메일 인증은 필수입니다.')
        }
        if (nicknameValidation === false){
          alert('닉네임 중복확인은 필수입니다.')
        }    
        if (Password === ConfirmPasword) {
          //수정 console.log(Name);
          //수정 console.log(Email);
    
          // const body = {
          //   email: Email,
          //   name: NickName,
          //   confirm_password: ConfirmPasword,
          //   password: Password,
          // };
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
                    { 
                      emailValidation === false 
                      ? <button onClick={sendEmail}>이메일 확인</button>
                      : <p>이메일 인증 성공</p>
                    }
                    
                    { emailConfirm === true && 
                    <div>
                      <p>번호 입력</p> 
                      <input name="confirmNum" value={confirmNum} onChange={handleConfirmNum} />
                      <button onClick={onConfirmNum}>입력</button>
                    </div>
                    } 
                    

                </div>
                <div className="wrap-input100 validate-input" data-validate="Enter username">
                  <input className="input100" type="nickname" name="nickname" placeholder="NickName" value={NickName} onChange={onNickNameHandler} />
                  <span className="focus-input100" data-placeholder="&#xf207;"></span>
                  {
                    nicknameValidation === false
                    ? <button onClick={onNicknameConfirm}>중복 확인</button>
                    : <p>아이디 중복 확인 성공</p>
                  }
                  
                  
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
                  <select onChange={handleUserKind} value={userKind}>
                  {selectuserList.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                  </select>
                </div>
                <div>
                  <input type="text" onChange={handlePhonNumber} value={phonNumber} />
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