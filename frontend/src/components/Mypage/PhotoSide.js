import React, { useState, useEffect } from 'react';
import './PhotoSide.css'
import axios from 'axios';
import SERVER from '../../API/server'

const PhotoSide = (props) => {
  const [imgBase64, setImgBase64] = useState(props.photoData); // 파일 base64
  const userData = localStorage.getItem('accessToken')

  
  
  const handleChangeFile = (e) => {
    e.preventDefault()
    console.log(e.target.files[0])
    const formdata = new FormData()
    formdata.append("userPhoto", e.target.files[0])
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
              imgBase64 === null
              ? <img src={process.env.PUBLIC_URL + '/image/noimage.png'} className="myPhoto-image" alt="no" />
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
    </div>
  );
}

export default PhotoSide;