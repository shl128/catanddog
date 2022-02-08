import React, { useState, useEffect } from 'react';
import './PhotoSide.css'
import noImage from '../image/이미지없음.png'
import axios from 'axios';
import SERVER from '../../API/server'

const PhotoSide = (props) => {
  const [nowPhotoData, setNowPhotoData] = useState("props.userPhoto")
  const [imgBase64, setImgBase64] = useState(props.photoData); // 파일 base64
  const [imgFile, setImgFile] = useState(props.photoData);	//파일
  const [userData, seUserData] = useState(localStorage.getItem('accessToken'))
  
  useEffect(() => {
    if (imgFile !== ''){
      axios.patch(SERVER.BASE_URL + SERVER.ROUTES.mypage, 
        { ...props.patchData,
          userPhoto: imgFile
        },
        {
        headers: {
            Authorization: `Bearer ${userData}`
          }})
        .then(res =>{
          // console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [imgFile])
  const handleChangeFile = async (e) => {
    // let reader = new FileReader();
    // reader.onloadend = () => {
    //   // 2. 읽기가 완료되면 아래코드가 실행됩니다.
    //   const base64 = reader.result;
    //   // console.log(base64)
    //   if (base64) {
    //     setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
    //   }
    // }
    e.preventDefault()
    if (e.target.files[0]) {
      setImgFile(URL.createObjectURL(e.target.files[0])); // 1. 파일을 읽어 버퍼에 저장합니다.
      // setImgFile(e.target.files[0]); // 파일 상태 업데이트

    }

  }



  return (
    <div className="PhotoSide">
            { 
              imgFile === '' 
              ? <img src={noImage} className="myPhoto-image" alt="no" />
              : <img src={imgFile} className="myPhoto-image" alt="no" />
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