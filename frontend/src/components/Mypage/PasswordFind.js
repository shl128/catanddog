import React, { useState} from 'react';
import Card from 'react-bootstrap/Card'
import '../Mypage/PasswordFind.css'
import axios from 'axios';
import SERVER from '../../API/server';
import { Link } from 'react-router-dom';

const PasswordFind = (props) => {
  const [Email, setEmail] = useState('');

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };  

  const onEmailFind = (e) => {
    // 먼저 디비에 보내서 있는지 검사하고 그 다음 확인 메일 보내서 검증시킨다.
    // console.log(Email)
    axios
    .get(
      SERVER.BASE_URL + SERVER.ROUTES.passwordFind + Email,
    )
    .then(function(response) {
      alert('이메일을 전송하였습니다. 이메일로 숫자를 확인 후 입력바랍니다.')
    })
  }
  return (
    <div className="PasswordFind">
      <div className='card'>
      <div className="register">
          <h4>비밀번호 찾기</h4>
          <form action="">
              <div className="flex">
                  <ul className="container">
                      <li className="item center">
                          이메일
                      </li>
                      <li className="item">
                          <input className='emailInput' type="email" name="Email" placeholder="Email" value={Email} onChange={onEmailHandler} autoFocus required></input>
                      </li>
                      <li className="item">
                          <button onClick={onEmailFind} className='submit'>메일 전송</button>
                      </li>
                  </ul>

                  <ul className="container">
                      <li className="item center">
                      </li>
                      <li className="item">

                      </li>
                      <li className="item">
                      </li>
                  </ul>
              </div>
          </form>
      </div>
      <Link to="/login">
        <p>로그인으로 돌아가기</p>
    </Link>
      </div>
    </div>
  );
}

export default PasswordFind;