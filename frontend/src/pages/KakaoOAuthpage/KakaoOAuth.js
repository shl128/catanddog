import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from "qs";
import SERVER from '../../API/server';
import { useNavigate  } from 'react-router-dom';

const KakaoOAuth = () => {

  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();
  const REST_API_KEY = "81167858a8e7e297800ffaee4b944bcc";
  const REDIRECT_URI = "http://localhost:3000/main";
  const code = new URL(window.location.href).searchParams.get("code");
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=${code}`;
  let navigate = useNavigate();

  const getToken = async () => {
    const formdata = new FormData();
    formdata.append("code",code);
    

    try {
      // access token 가져오기
      axios
        .post(
          SERVER.BASE_URL + "api/v1/restAuth/kakaoLogin",formdata
        )
        .then(function (response) {
            console.log(response.data)
            localStorage.setItem('accessToken', response.data.accessToken);
            alert('로그인이 정상적으로 완료되었습니다');

            return(
              navigate('/main')
            )
        })
        .catch(function (error) {
          alert('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다');
          // //수정 console.log(error);
        });

      // Kakao Javascript SDK 초기화
      // window.Kakao.init(REST_API_KEY);
      // access token 설정
      // window.Kakao.Auth.setAccessToken(res.data.access_token);

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return(
    <div>
      
    </div>
  )
};

export default KakaoOAuth;