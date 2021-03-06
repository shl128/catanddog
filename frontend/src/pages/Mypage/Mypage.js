import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Mypage.css'
import SERVER from '../../API/server'
import {PhotoSide, MypageTextForm, MypageHashtag, WithdrawalModal } from '../../components'

const Mypage = (props) => {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('');
  const [firstNickname, setFirstNickname] = useState('');
  const [nickname, setNickName] = useState('');
  const [nickNameConfirm, setnickNameConfirm] = useState(true);
  const [phonNumber, setPhonNumber] = useState('');
  const [userKind, setUserKind] = useState(0);
  const [userKindName, setUserKindName] = useState('');
  const [userPhoto, setUserPhoto] = useState('')
  const [loading, setLoading] = useState(false)
  const [userData, seUserData] = useState(localStorage.getItem('accessToken'))
  const [userRegdate, setUserRegdate] = useState(null)
  const [userGrade, setUserGrade] = useState(null)
  const [userActive, setUserActive] = useState(null)
  const [update, setUpdate] = useState(false)
  const [show, setShow] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get(SERVER.BASE_URL + SERVER.ROUTES.mypage,
      {headers: {
        Authorization: `Bearer ${userData}`
      }})
    .then(res => {
      setUser(res.data)
      setEmail(res.data.userEmail)
      setNickName(res.data.userNickname)
      setFirstNickname(res.data.userNickname)
      setPhonNumber(res.data.userPhone)
      setUserKind(res.data.userKind)
      setUserPhoto(res.data.userPhoto)
      setUserRegdate(res.data.userRegdate)
      setUserGrade(res.data.userGrade)
      setUserActive(res.data.userActive)
      setLoading(true)
    })
    .catch(err => {
      console.log(err)
    })

    axios.get(SERVER.BASE_URL + SERVER.ROUTES.tag,
    {headers: {
      Authorization: `Bearer ${userData}`
    }})
    .then(res => {
      console.log(res.data)
      setTags(res.data.reverse())
      console.log(tags)
    })
    .catch(err => {
      console.log(err)
    })
  }, []);

  useEffect(() => {
    if(update && nickname !== firstNickname){
      setnickNameConfirm(false)
    }
    if(nickname === firstNickname){
      setnickNameConfirm(true)
    }
  }, [nickname])

  const onNicknameConfirm = (e) => {
    e.preventDefault()
    axios
    .get(
      SERVER.BASE_URL + SERVER.ROUTES.mypage + `/{user_nickname_check}?userNickname=${nickname}`,
    )
    .then(function (response) {
      if(response.data === true){
        setnickNameConfirm(true)
        alert('?????? ????????? ????????? ?????????.')
      } else{
        alert('?????? ???????????? ????????? ?????????.')
      }
    })
    .catch((err)=> {
      alert('???????????? ??????')
    })
  }

  useEffect(() => {
    if (userKind === 0){
      setUserKindName('?????? ??????')
    }
    else{
      setUserKindName('??????')
    }
  }, [userKind])


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onwithdrawal = (e) => {
    e.preventDefault()
    axios.delete(SERVER.BASE_URL + SERVER.ROUTES.mypage ,
      {headers: {
        Authorization: `Bearer ${userData}`
      }})
    .then(res => {
      setShow(false)
      localStorage.removeItem('accessToken')
      alert('?????? ??????')
    })
    .catch(err => {
      console.log(err)
    })
  }

  const patchData = {
    "userActive": 0,
    "userGrade": 0,
    "userKind": userKind,
    "userNickname": nickname,
    "userPhone": phonNumber,
    "userPhoto": userPhoto
  }

  const onUpdate = (e) =>{
    e.preventDefault()
    // console.log(patchData);
    if (update === false) {
      setUpdate(true)
    }
    else {
      if(!nickNameConfirm){
        alert('????????? ????????? ??????????????? ?????? ?????????.')
      }else{
        axios.patch(SERVER.BASE_URL + SERVER.ROUTES.mypage, patchData,
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

  const onTagsHandle = (e) => {
    setTags(...tags)
  }

  return (
    <div className="Mypage">
      {
        loading === false
        ?
        <div></div>
        :
        <div className='mypageContainer'>
          <div className='mypageImageBox'>
            <PhotoSide onPhoto={onUserPhotohandle} photoData={userPhoto} patchData={patchData} email={email}/>
          </div>
          <div className='mypageContentBox'>
            <MypageTextForm role='?????? ??????' data={userKindName} update={update} handleData={onUserKindHandler}/>
            <MypageTextForm role='?????????' data={nickname} update={update} handleData={onNickNameHandler} onNicknameConfirm={onNicknameConfirm} nickNameConfirm={nickNameConfirm}/>
            <MypageTextForm role='?????????' data={email} update={update}  handleData={onEmailHandler}/>
            <MypageTextForm role='????????????' data={phonNumber} update={update}  handleData={onPhonNumberHandler}/>
            <div className='hasharea'>
              <MypageHashtag role='?????????' update={update} tags={tags} handleData={onTagsHandle} />
            </div>

            <div className='buttonContainer'>
              {
                update === false
                ?
                <button onClick={onUpdate} className='mypageUpdateButton'>????????????</button>
                
                :
                <div className='mypageOnUpdate'>
                  <button onClick={onUpdate} className='updateCorrectButton'>????????????</button>
                  <button onClick={cancelUpdate} className='updateCancleButton'>????????????</button>
                </div>
              }

            </div>
            <div className='resilience'>
              <WithdrawalModal show={show} handleClose={handleClose} handleShow={handleShow} onwithdrawal={onwithdrawal}/>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Mypage;