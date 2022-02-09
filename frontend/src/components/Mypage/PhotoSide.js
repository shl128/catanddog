import React, { useState, useEffect } from 'react';
import './PhotoSide.css'
import noImage from '../image/이미지없음.png'
import axios from 'axios';
import SERVER from '../../API/server'

const PhotoSide = (props) => {
  const [nowPhotoData, setNowPhotoData] = useState(props.photoData)
  const [imgBase64, setImgBase64] = useState(props.photoData); // 파일 base64
  const [imgFile, setImgFile] = useState(props.photoData);	//파일
  const [userData, seUserData] = useState(localStorage.getItem('accessToken'))

  
  const handleChangeFile = async (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      setImgFile(base64)
    }
  }

  const sendImage = (e) => {
    const formdata = new FormData()
    formdata.append('uploadImage', imgFile[0])
    axios.patch(SERVER.BASE_URL + SERVER.ROUTES.mypage, 
    { ...props.patchData,
      userPhoto: formdata
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
  }


  return (
    <div className="PhotoSide">
            { 
              imgFile === '' 
              ? <img src={noImage} className="myPhoto-image" alt="no" />
              : <img width='500' height='500' src={imgFile} className="myPhoto-image" alt="no" />
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
            <button onClick={sendImage}>저장하기</button>
    </div>
  );
}

export default PhotoSide;