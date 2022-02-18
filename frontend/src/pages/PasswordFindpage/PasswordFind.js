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
    // 먼저 디비에 보내서 있는지 검사하고 그 다음 확인 메일 보내서 검증시킨다.
    // axios
    // .get(
    //   SERVER.BASE_URL + SERVER.ROUTES.passwordFind + Email,
    // )
    // .then(function(response) {
    //   alert('이메일을 전송하였습니다. 이메일로 숫자를 확인 후 입력바랍니다.')
    // })
    // .catch((err) => {
    //   alert('회원 등록되어있지 않은 이메일 입니다.')
    // })
    const tempRandomNumber = Math.floor(Math.random() * 9000 + 1000 )
    setRandomNumber(tempRandomNumber)
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
        SERVER.BASE_URL + SERVER.ROUTES.password + Email,
        {
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
    <div className='ground'>
      <div className="PasswordFind">
        
        <div className='card'>
          <img className='logoImg' src={process.env.PUBLIC_URL + '/image/logo.png'} alt='logo' width="120px" />
        <div className="register">
      
            <div className='PasswordContainer'>
              
              <h4>이메일로 비밀번호 찾기</h4>
            </div>
            <form action="">
                <div className="flex">
                    <ul className="PasswordContainer">
                        <li className="item center">
                            이메일
                        </li>
                        <li className="item">
                          {
                            emailValidation === false
                            ?
                            <input className='emailInput' type="email" name="Email" placeholder="Email" value={Email} onChange={onEmailHandler} autoFocus required></input>
                            :
                            <input className='emailInput' type="email" name="Email" placeholder="Email" value={Email} onChange={onEmailHandler} readOnly></input>
                            // <h className="correctEmail">{Email}</h>
                          }
                        </li>
                        <li className="item">
                          {
                            emailValidation === false
                            &&
                            <button onClick={onEmailFind} className='submit'>메일 전송</button>
                          }
                            
                        </li>
                    </ul>
                    {
                      emailConfirm === true &&
                      <ul className="PasswordContainer confirm">
                          <li className="item">
                            <input className='numInput' placeholder="4자리 숫자 입력" autoFocus required value={confirmNum} onChange={handleConfirmNum}/>
                          </li>
                          <li className="item">
                            <button onClick={onConfirmNum} className='submit' >확인</button>
                          </li>
                      </ul>
                    }
                    { 
                    emailValidation === true &&
                    <div>
                      <ul className="PasswordContainer">
                          <li className="item center">
                              새로운 비밀번호
                          </li>
                          <li className="item">
                              <input className='emailInput'  type="password" name="password" placeholder="Password" value={Password} onChange={onPasswordHanlder} autoFocus required></input>
                          </li>
                      </ul>
                      <ul className="PasswordContainer">
                          <li className="item center">
                              비밀번호 확인
                          </li>
                          <li className="item">
                              <input className='emailInput' type="password" name="password" value={ConfirmPasword} placeholder="Confirm Password" onChange={onConfirmPasswordHandler} autoFocus required></input>
                              {passwordError && <div style={{ color: 'red', fontSize: '20px', marginLeft: '50px', marginTop:'10px' }}>비밀번호가 일치하지 않습니다.</div>}
                          </li>
                      </ul>
                      <ul className="PasswordContainer">
                        <li className="item center">
                        </li>                    
                        <li className="item passwordChange">
                          <button onClick={onPasswordChange} className='submit'>변경완료</button>
                        </li>
                      </ul>
                    </div>
                    }

                    <ul className="PasswordContainer">
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

    </div>
  );
}

export default PasswordFind;