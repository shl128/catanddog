import React, { useState} from 'react';
import './PasswordFind.css'
import axios from 'axios';
import SERVER from '../../API/server';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com'

const PasswordFind = (props) => {
  const [Email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [randomNumber, setRandomNumber] = useState('')
  const [confirmNum, setConfirmNum] = useState('')
  const [emailValidation, setEmailValidation] = useState(false);
  const [Password, setPassword] = useState('');
  const [ConfirmPasword, setConfirmPasword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };  

  const handleConfirmNum = (e) => {
    setConfirmNum(e.target.value);
  };

  const onConfirmNum = (e) => {
    e.preventDefault()
    console.log(confirmNum, randomNumber)
    if (String(confirmNum) === String(randomNumber)){
      setEmailConfirm(false)
      setEmailValidation(true)
    } else {
      alert('문구가 틀렸습니다.')
    }
  }
  const templateParams = {
    email: Email,
    notes: ''
  };

  const onEmailFind = (e) => {
    e.preventDefault()
    const tempRandomNumber = Math.floor(Math.random() * 9000 + 1000 )
    setRandomNumber(tempRandomNumber)
    templateParams.notes = tempRandomNumber

    // 먼저 디비에 보내서 있는지 검사하고 그 다음 확인 메일 보내서 검증시킨다.
    axios
    .get(
      SERVER.BASE_URL + SERVER.ROUTES.emailConfirm + '{user_email}?userEmail=' + Email,
    )
    .then(function(response) {
      if(response.data === '')
      {
        alert('회원가입 되지 않은 메일입니다.')
      } else{
        // alert('이메일을 전송하였습니다. 이메일로 숫자를 확인 후 입력바랍니다.')
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

    })
    .catch((err) => {
      alert('회원 등록되어있지 않은 이메일 입니다.')
    })

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

  const onPasswordChange = (e) => {
    e.preventDefault()
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
    if(Password !== ConfirmPasword) {
      alert('두 비밀번호 값이 다릅니다.')
    }
    if (Password === ConfirmPasword) 
      axios.patch(
        SERVER.BASE_URL + SERVER.ROUTES.password,
        {
          userEmail: Email,
          userPassword: Password,
        }
      )
      .then((response) => {
        console.log(response)
        alert('변경완료')
        window.location.replace(`/login`)
      })
      .catch(err => {
        alert('실패')
      })

  }

  return (
    <div className='PasswordFind-page'>
      <div className="PasswordFind">
        <img className='Password-logo' src={process.env.PUBLIC_URL + '/image/logo.png'} alt='logo'  />
        <div className="PasswordFind-content">
          <h4 className='PasswordFind-h4'>이메일로 비밀번호 찾기</h4>
            <form className="PasswordFind-form">
              <div className="PasswordFind-form-item">
                  <div className="PasswordFind-form-item-label">
                      이메일
                  </div>
                    {
                      emailValidation === false
                      ?
                      <input className='PasswordFind-form-itme-input' type="email" name="Email" placeholder="Email" value={Email} onChange={onEmailHandler} autoFocus required></input>
                      :
                      <input className='PasswordFind-form-itme-input' type="email" name="Email" placeholder="Email" value={Email} onChange={onEmailHandler} readOnly></input>
                    }
                  <div className="">
                    {
                      emailValidation === false
                      &&
                      <button onClick={onEmailFind} className='PasswordFind-form-item-button'>메일 전송</button>
                    }
                      
                  </div>
              </div>
              {
                emailConfirm === true &&
                <div className="PasswordFind-form-item">
                    <div className="">
                      <input className='PasswordFind-form-itme-input' placeholder="4자리 숫자 입력" autoFocus required value={confirmNum} onChange={handleConfirmNum}/>
                    </div>
                    <button onClick={onConfirmNum} className="PasswordFind-form-item-button">확인</button>
                </div>
              }
              { 
              emailValidation === true &&
              <div className="PasswordFind-form">
                <div className="PasswordFind-form-item">
                  <div className="PasswordFind-form-item-label">
                      새로운 비밀번호
                  </div>
                  <input className="PasswordFind-form-itme-input" type="password" name="password" placeholder="Password" value={Password} onChange={onPasswordHanlder} autoFocus required></input>
                            
                </div>
                <div className="PasswordFind-form-item">
                  <div className="PasswordFind-form-item-label">
                      비밀번호 확인
                  </div>
                    <input className='PasswordFind-form-itme-input' type="password" name="password" value={ConfirmPasword} placeholder="Confirm Password" onChange={onConfirmPasswordHandler} autoFocus required></input>
                    {passwordError && <div style={{ color: 'red', fontSize: '20px', marginLeft: '50px', marginTop:'10px' }}>비밀번호가 일치하지 않습니다.</div>}
                </div>    
                <button onClick={onPasswordChange} className='PasswordFind-form-item-okay-button'>변경완료</button>

              </div>
              }
              <Link to="/login" className='back'>
                <div>로그인 페이지로 돌아가기</div>
              </Link>

            </form>
        </div>
      </div>

    </div>
  );
}

export default PasswordFind;