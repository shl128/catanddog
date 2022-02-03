import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Mypage.css'
import SERVER from '../../API/server'
import {PhotoSide, MypageTextForm, MypageHashtag } from '../../components'

const Mypage = (props) => {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('');
  const [nickname, setNickName] = useState('');
  const [nickNameConfirm, setnickNameConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [ConfirmPasword, setConfirmPasword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [phonNumber, setPhonNumber] = useState('');
  const [userKind, setUserKind] = useState(0);
  const [userPhoto, setUserPhoto] = useState('')
  const [loading, setLoading] = useState(false)
  const [userData, seUserData] = useState(localStorage.getItem('accessToken'))
  const [userRegdate, setUserRegdate] = useState(null)
  const [userGrade, setUserGrade] = useState(null)
  const [userActive, setUserActive] = useState(null)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    axios.get(SERVER.BASE_URL + SERVER.ROUTES.mypage,
      {headers: {
        Authorization: `Bearer ${userData}`
      }})
    .then(res => {
      setUser(res.data)
      setEmail(res.data.userEmail)
      setNickName(res.data.userNickname)
      setPhonNumber(res.data.userPhone)
      setUserKind(res.data.userKind)
      setUserRegdate(res.data.userRegdate)
      setUserGrade(res.data.userGrade)
      setUserActive(res.data.userActive)
      setLoading(true)
    })
    .catch(err => {
      console.log(err)
    })
  }, []);
  const onUpdate = (e) =>{
    e.preventDefault()
    if (update === false) {
      setUpdate(true)
    }
    else {
      // const patchData = {
      //   "userActive": true,
      //   "userGrade": 0,
      //   "userKind": 0,
      //   "userNickname": nickname,
      //   "userPhone": parseInt(phonNumber) 
      // }
      axios.patch(SERVER.BASE_URL + SERVER.ROUTES.mypage, 
        {
          ...user,
          "userPhone": parseInt(phonNumber) 
        },
        {
        headers: {
            Authorization: `Bearer ${userData}`
          }})
        .then(res =>{
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      setUpdate(false)
    }
  }
  const cancelUpdate = (e) => {
    e.preventDefault()
    setUpdate(false)
  }
  const onEmailHandler = (e) => {
      setEmail(e.currentTarget.value);
  };

  const onNickNameHandler = (e) => {
      setNickName(e.target.value);
  };

   
  // const onPasswordHanlder = (e) => {
  //     setPassword(e.target.value);
  //     if (e.target.value === '' && password === '') {
  //         setPasswordError(false);
  //     }
  // };

  // const onConfirmPasswordHandler = (e) => {
  //     setConfirmPasword(e.currentTarget.value);
  //     setPasswordError(e.target.value !== password);
  //     if (e.currentTarget.value === '' && password === '') {
  //     setPasswordError(false);
  //     }
  // };

  const onPhonNumberHandler = (e) => {
      const regex = /^[0-9\b -]{0,13}$/;
      if (regex.test(e.target.value)) {
        setPhonNumber(e.target.value);
      }
  };

  const onUserKindHandler = (e) => {
      setUserKind(e.target.value);
  };

  const onUserPhotohandle = (e) => {
    setUserPhoto(e)
  }
  // const onNicknameConfirm = (e) => {
  // e.preventDefault()
  // // axios
  // // .get(
  // //     SERVER.BASE_URL + SERVER.ROUTES.nicknameConfirm + nickname,
  // // )
  // // .then(function (response) {
  // //     alert('사용 가능한 닉네임 입니다.');
  // //     setNicknameValidation(true)
  // // })
  // // .catch((err)=> {
  // //     alert('사용 불가능한 닉네임 입니다.')
  // // })

  // console.log(SERVER.BASE_URL + SERVER.ROUTES.nicknameConfirm + nickname)
  // }
  // const getUser = (e) =>{
  //   e.preventDefault()
  //   console.log(localStorage.getItem('accessToken'))
  //   console.log(JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])))
  //   setUser(localStorage.getItem('accessToken'))
  // }

  // const onMypage = (e) => {
  //   e.preventDefault()
  //   axios.get(SERVER.BASE_URL + SERVER.ROUTES.mypage,
  //     {headers: {
  //       Authorization: `Bearer ${user}`
  //     }})
  //   .then(res => {
  //     console.log(res)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }
  return (
    <div className="Mypage">
      {
        loading === false
        ?
        <div>
          로딩 중
        </div>
        :
        <div className='mypageContainer'>
          <div className='mypageImageBox'>
            <PhotoSide onPhoto={onUserPhotohandle} photoData={userPhoto}/>
            { userPhoto }
          </div>
          <div className='mypageContentBox'>
            <MypageTextForm role='유저 종류' data={userKind} update={update} handleData={onUserKindHandler}/>
            <MypageTextForm role='닉네임' data={nickname} update={update} handleData={onNickNameHandler}/>
            <MypageTextForm role='이메일' data={email} update={update}  handleData={onEmailHandler}/>
            <MypageTextForm role='전화번호' data={phonNumber} update={update}  handleData={onPhonNumberHandler}/>
            <MypageHashtag role='관심사' update={update} />
            <div className='buttonContainer'>
              {
                update === false
                ?
                <button onClick={onUpdate} className='mypageUpdateButton'>수정하기</button>
                :
                <div className='mypageOnUpdate'>
                  <button onClick={onUpdate} className='updateCorrectButton'>수정완료</button>
                  <button onClick={cancelUpdate} className='updateCancleButton'>수정취소</button>
                </div>

              }
              

            </div>
          </div>
        </div>
      }

    </div>
  );
}

export default Mypage;