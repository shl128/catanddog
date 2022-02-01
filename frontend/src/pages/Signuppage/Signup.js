import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SERVER from '../../API/server';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com'
import './Signup.css'
import logo from '../../components/image/로고.png'

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
        // if (nicknameValidation === false){
        //   alert('닉네임 중복확인은 필수입니다.')
        // }    
        if (Password === ConfirmPasword) {

          axios
            .post(
              SERVER.BASE_URL + SERVER.ROUTES.signup,
              {
                // userPhoto: ''
                "userEmail": Email,
                "userKind": 0,
                "userNickname": NickName,
                "userPassword":  Password,
                "userPhone": 43367124,
              }
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
      <div className='signup'>
        <div className='card'>
          <img className='logoImg' src={logo} alt='logo' width="120px" />
         <div className="signupForm">
      
            <div className='signupContainer'>
              
              <h4>회원가입</h4>
            </div>
            <form onSubmit={onSubmitHandler}>
                <div className="flex">
                    <ul className="signupContainer">
                        <li className="item center">
                            이메일
                        </li>
                        <li className="item">
                            <input className='emailInput' type="email" name="Email" placeholder="Email" value={Email} onChange={onEmailHandler} autoFocus required></input>
                        </li>
                        <li className="item">
                            { 
                              emailValidation === false 
                              ? <button onClick={sendEmail} className='submit'>이메일 확인</button>
                              : <p>인증 성공</p>
                            }
                        </li>
                    </ul>
                    {
                      emailConfirm === true &&
                      <ul className="signupContainer confirm">
                          <li className="item">
                            <input className='numInput' placeholder="4자리 숫자 입력" autoFocus required value={confirmNum} onChange={handleConfirmNum}/>
                          </li>
                          <li className="item">
                            <button onClick={onConfirmNum} className='submit' >확인</button>
                          </li>
                      </ul>
                    }
                    <ul className="signupContainer">
                      <li className="item center">
                        닉네임
                      </li>                    
                      <li className="item ">
                        <input className="emailInput" type="nickname" name="nickname" placeholder="NickName" value={NickName} onChange={onNickNameHandler} />
                      </li>
                      <li className='item'>
                        {
                          nicknameValidation === false
                          ? <button onClick={onNicknameConfirm} className='submit'>중복 확인</button>
                          : <p>아이디 중복 확인 성공</p>
                        }
                      </li>
                    </ul>
                    <ul className="signupContainer">
                      <li className="item center">
                      비밀번호
                      </li>                    
                      <li className="item ">
                        <input className="emailInput" type="password" name="password" placeholder="Password" value={Password} onChange={onPasswordHanlder} />
                      </li>
                    </ul>
                    <ul className="signupContainer">
                      <li className="item center">
                      비밀번호 확인
                      </li>                    
                      <li className="item ">
                        <input className="emailInput" type="password" name="password" value={ConfirmPasword} placeholder="Confirm Password" onChange={onConfirmPasswordHandler} />
                      </li>
                    </ul>
                    <ul className="signupContainer">
                      <li className="item center">
                      </li>                    
                      <li className="item ">
                        {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
                      </li>
                    </ul>

                    <ul className="signupContainer">
                      <li className="item center">
                      분류
                      </li>                    
                      <li className="item ">
                        <select onChange={handleUserKind} value={userKind}>
                        {selectuserList.map((item) => (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        ))}
                        </select>
                      </li>
                    </ul>
                    <ul className="signupContainer">
                      <li className="item center">
                        핸드폰 번호
                      </li>                    
                      <li className="item ">
                        <input className="emailInput" type="text" onChange={handlePhonNumber} value={phonNumber} />
                      </li>
                    </ul>

                      <ul className="signupContainer">
                        <li className="item center">
                        </li>                    
                        <li className="item passwordChange">
                          <button className='submit'>회원 가입</button>
                        </li>
                      </ul>

                    <ul className="signupContainer">
                      <li className="item center">
                      </li>                    
                      <li className="item passwordChange">
                        <Link to="/login" className='back'>
                          <div>로그인 페이지로 돌아가기</div>
                        </Link>
                      </li>
                    </ul>
                </div>
            </form>
          </div>
        </div>
      </div>
      );
  }

export default Signup;