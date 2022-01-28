import React from 'react';
import Card from 'react-bootstrap/Card'
import '../Mypage/PasswordFind.css'
import axios from 'axios';
import SERVER from '../../API/server';

const PasswordFind = (props) => {
  return (
    <div className="PasswordFind">
      <div className='card'>
        <div class="register">
          <h3>회원가입</h3>
          <form action="">
              <div class="flex">
                  <ul class="container">
                      <li class="item center">
                          이름
                      </li>
                      <li class="item">
                          <input type="text" name="name" autofocus required></input>
                      </li>
                      <li class="item">
                          
                      </li>
                  </ul>
                  <ul class="container">
                      <li class="item center">
                          아이디
                      </li>
                      <li class="item">
                          <input type="text" placeholder="아이디를 입력하세요." required></input>
                      </li>
                      <li class="item">
                          <button class="idcheck">중복확인</button>
                      </li>
                  </ul>
                  <ul class="container">
                      <li class="item center">
                          비밀번호
                      </li>
                      <li class="item">
                          <input type="password" placeholder="비밀번호를 입력하세요." required></input>
                      </li>
                      <li class="item">
                          
                      </li>
                  </ul>
                  <ul class="container">
                      <li class="item center">
                          비밀번호 확인
                      </li>
                      <li class="item">
                          <input type="password" placeholder="비밀번호를 입력하세요." required></input>
                      </li>
                      <li class="item">
                          
                      </li>
                  </ul>

                  <ul class="container">
                      <li class="item center">
                          성별
                      </li>
                      <li class="item">
                          <select name="gender" id="">
                              <option value="선택" selected>선택</option>
                              <option value="남성">남성</option>
                              <option value="여성">여성</option>
                          </select>
                      </li>
                      <li class="item">
                          
                      </li>
                  </ul>
                  <ul class="container">
                      <li class="item center">
                          전화번호
                      </li>
                      <li class="item">
                          <input type="text" placeholder="휴대전화번호"></input>
                      </li>
                      <li class="item">
                          
                      </li>
                  </ul>
                  <ul class="container">
                      <li class="item center">
                          
                      </li>
                      <li class="item">
                          <button class="submit">가입하기</button>
                      </li>
                      <li class="item">
                          
                      </li>
                  </ul>
              </div>
          </form>
      </div>
        
      </div>
    </div>
  );
}

export default PasswordFind;