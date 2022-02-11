import React, { useState, useEffect } from 'react';
import './PhotoSide.css'
import noImage from '../image/이미지없음.png'
import axios from 'axios';
import SERVER from '../../API/server'

const PhotoSide = (props) => {
  const [nowPhotoData, setNowPhotoData] = useState(props.photoData)
  const [imgBase64, setImgBase64] = useState(props.photoData); // 파일 base64
  const [userData, seUserData] = useState(localStorage.getItem('accessToken'))

  
  
  const handleChangeFile = (e) => {
    e.preventDefault()
    console.log(e.target.files[0])
    const formdata = new FormData()
    formdata.append("userPhoto", e.target.files[0])

    //{user_email}?userEmail=t1%40naver.com
    axios.patch(SERVER.BASE_URL + SERVER.ROUTES.userPhoto ,  formdata,
      {
      headers: {
          Authorization: `Bearer ${userData}`
      }})
      .then(res =>{
       console.log(res)
       axios.get(SERVER.BASE_URL + SERVER.ROUTES.mypage,
        {headers: {
          Authorization: `Bearer ${userData}`
        }})
        .then( res => {
          setImgBase64(res.data.userPhoto)
        })
      })
      .catch(err => {
        console.log(err)
      })
  }



  return (
    <div className="PhotoSide">
            { 
              imgBase64 === '' 
              ? <img src={noImage} className="myPhoto-image" alt="no" />
              : <img width='500' height='500' src={'data:image/png;base64,' + imgBase64} className="myPhoto-image" alt="no" />
            }
            <div className="mt-1">
              <label className="photoButton" htmlFor="input-file">프로필 사진 변경</label>
              <input type="file"
                name="input-file" id="input-file" 
                accept='image/*'
                onChange={handleChangeFile}
                style={{display:"none"}}
              />
            </div>
            {/* <button onClick={clcl}> 수정</button> */}
    </div>
  );
}

export default PhotoSide;