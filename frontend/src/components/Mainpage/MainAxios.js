import {useEffect, useState} from 'react'
import axios from 'axios'
import SERVER from '../../API/server'

const profileUrl = SERVER.BASE_URL + SERVER.ROUTES.mypage
const petUrl = SERVER.BASE_URL + SERVER.ROUTES.createPet
const myChatUrl = SERVER.BASE_URL + SERVER.ROUTES.myChatRoom
const userData = localStorage.getItem('accessToken')
const petImgUrl = SERVER.BASE_URL + "petPage/pets/image/petPhoto"

function MyProfile() {
  return axios.get(profileUrl, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function ChangeActive(data) {
  console.log("정보를 변경합니다", data)
  return axios.patch(profileUrl, data, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function MyChatRoom() {
  return axios.get(myChatUrl, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function MyPet() {
  const [petdata, setPetdata] = useState([])

  useEffect(() => {
    axios.get(petUrl,
      {
        headers: {
          Authorization: `Bearer ${userData}`
        }
      })
    .then(function(response) {
      console.log("반려동물 정보 불러오기 성공")
      // setPetdata(response.data)
  
      for(let i=0; i<response.data.length; i++){
        let formData = new FormData();
        formData.append('petPhoto',response.data[i].petPhoto);
        axios.post(petImgUrl,formData,
          {
            responseType:'blob'
          },
          {
            headers: {
              Authorization: `Bearer ${userData}`
            }
          })
          .then((res)=>{
            let url = window.URL || window.webkitURL;
            let imgsrc = url.createObjectURL((new Blob([res.data], { type: 'image/png' })))
            response.data[i].petPhotoImg = imgsrc;
          })
      }
      console.log(response.data);
      setPetdata(response.data);
    })
    .catch(function(e) {
      console.log("반려동물 정보 불러오기 실패")
      console.log(e);
    })
  }, [])
  return petdata

}

export { MyProfile, ChangeActive, MyChatRoom, MyPet }