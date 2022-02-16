import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SERVER from '../../API/server';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com'
import './Signup.css'

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
    const [randomNumber, setRandomNumber] = useState('')
    const [confirmNum, setConfirmNum] = useState('')
    const [emailValidation, setEmailValidation] = useState(false);
    const [nicknameValidation, setNicknameValidation] = useState(false);
    const [userKindNum, setUserKindNum] = useState(0)


    useEffect(() => {
      if (phonNumber.length === 10) {
        setPhonNumber(phonNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
      }
      if (phonNumber.length === 13) {
        setPhonNumber(phonNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
      }
    }, [phonNumber]);

    useEffect(() => {
      if (userKind === "의사"){
        setUserKindNum(2)
      }
      else{
        setUserKindNum(0)
      }
    }, [userKind])
    const handleUserKind = (e) => {
      setUserKind(e.target.value);
    };
    const handleConfirmNum = (e) => {
      setConfirmNum(e.target.value);
    };
    const onConfirmNum = (e) => {
      e.preventDefault()
      if (confirmNum === randomNumber){
        setEmailValidation(true)
        setEmailConfirm(false)
        console.log(emailValidation)
      } else {
        alert('문구가 틀렸습니다.')
      }
    }
    const onNicknameConfirm = (e) => {
      e.preventDefault()
      axios.get(
        SERVER.BASE_URL + SERVER.ROUTES.mypage + `/{user_nickname_check}?userNickname=${NickName}`,
      )
      .then(function (response) {
        console.log(response)
        if(response.data === true){
          setNicknameValidation(true)
          alert('사용가능한 닉네임 입니다.')
        } else{
          alert('사용 불가능한 닉네임 입니다.')
        }
      })
      .catch((err)=> {
        alert('서버연결 실패')
      })
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
      // ex) http://localhost:8080/api/v1/myPage/{user_email}?userEmail=hansangwoo1996%40gmail.com
      axios.get(SERVER.BASE_URL + SERVER.ROUTES.eamailConfirm + '{user_email}?userEmail=' + Email)
      .then(res => {
        if(res.data === ""){
          emailjs.send(
            'service_sangwoo',
            'template_5rbudkm',
            templateParams,
            'user_LEBGlHpyf8P6UlU2H8lm9'
            ).then(res => {
              setEmailConfirm(true)
              alert('인증메일을 보냈습니다. 확인 후 숫자를 입력 바랍니다.')
            }).catch(error => ( alert('인증가능한 이메일 주소를 입력해 주세요')))
        } else{
          alert('이미 회원가입이 되어있는 이메일 입니다.')
        }
      })
      .catch(err => {
      })

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

          axios
            .post(
              SERVER.BASE_URL + SERVER.ROUTES.signup,
              {
                // userPhoto: ''
                "userEmail": Email,
                "userKind": userKindNum,
                "userNickname": NickName,
                "userPassword":  Password,
                "userPhone": phonNumber,
              }
            )
            .then(function (response) {
              //수정 console.log(response);
              alert('가입이 정상적으로 완료되었습니다');
              window.location.replace(`/login`)
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
      <div className="Signup-page">
        <div className="Signup">
          <img className="Signup-img" src={process.env.PUBLIC_URL + '/image/logo.png'} alt='logo' width="120px" />
          <div className="Signup-content">
            <h4>회원가입</h4>
            <form className="Signup-form" onSubmit={onSubmitHandler}>
              <div className="Signup-form-item">
                <div className="Signup-form-item-label">이메일</div>
                {emailValidation === false 
                  ?
                  <input className="Signup-form-itme-input" type="email" name="Email" placeholder="Email" value={Email} onChange={onEmailHandler} autoFocus required />
                  :
                  <input className="Signup-form-itme-input" type="email" name="Email" placeholder="Email" value={Email} onChange={onEmailHandler} autoFocus readOnly />
                }
                {emailValidation === false 
                  && <button className="Signup-form-item-button" onClick={sendEmail}>이메일 확인</button>
                }
              </div >
              {emailConfirm === true &&
                <div className="Signup-form-item">
                  <div className="Signup-form-item-label"></div>
                  <input className="Signup-form-itme-input" placeholder="4자리 숫자 입력" autoFocus required value={confirmNum} onChange={handleConfirmNum}/>
                  <button className="Signup-form-item-button" onClick={onConfirmNum}>확인</button>
                </div>
              }
              <div className="Signup-form-item">
                <div className="Signup-form-item-label">닉네임</div>                    
                <input className="Signup-form-itme-input" type="nickname" name="nickname" placeholder="NickName" value={NickName} onChange={onNickNameHandler} />
                <button className="Signup-form-item-button" onClick={onNicknameConfirm}>중복 확인</button>
              </div>
              <div className="Signup-form-item">
                <div className="Signup-form-item-label">비밀번호</div>                    
                <input className="Signup-form-itme-input" type="password" name="password" placeholder="Password" value={Password} onChange={onPasswordHanlder} />
              </div>
              <div className="Signup-form-item">
                <div className="Signup-form-item-label">비밀번호 확인</div>                    
                <input className="Signup-form-itme-input" type="password" name="password" value={ConfirmPasword} placeholder="Confirm Password" onChange={onConfirmPasswordHandler} />
              </div>
              {passwordError &&
                <div className="Signup-form-item">
                  <div className="Signup-form-item-label"></div>
                  <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>
                </div>
              }
              <div className="Signup-form-item">
                <div className="Signup-form-item-label">분류</div>                    
                <select className="Signup-form-itme-input" onChange={handleUserKind} value={userKind}>
                {selectuserList.map(item => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
                </select>
              </div>
              <div className="Signup-form-item">
                <div className="Signup-form-item-label">핸드폰 번호</div>                    
                <input className="Signup-form-itme-input" type="text" onChange={handlePhonNumber} value={phonNumber} />
              </div>
              <button className="Signup-button">회원 가입</button>
              <Link to="/login" className="Signup-link">로그인 페이지로 돌아가기</Link>
            </form>
          </div>
        </div>
      </div>
      );
  }

export default Signup;