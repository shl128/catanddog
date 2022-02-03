import {useEffect, useState} from 'react'
import axios from 'axios'
import SERVER from '../../API/server'


function MyProfile() {
  const [userName, setUserName] = useState(null);
  // const [userPhoto, setUserPhoto] = useState('')
  const userData = localStorage.getItem('accessToken')
  const url = SERVER.BASE_URL + SERVER.ROUTES.mypage

  useEffect(() => {
    axios.get(url, 
      {
        headers: {
          Authorization: `Bearer ${userData}`
        }
      })
    .then(function(response) {
      setUserName(response.data.userNickname)
      // setUserPhoto(response.data.userPhoto)
      console.log(response.data)
      console.log("회원정보 불러오기 성공")
    })
    .catch(function(error) {
      console.log("회원정보 불러오기 실패")
    });
  }, [userName, url, userData])

  return userName
}


function MyPet() {
  const [petdata, setPetdata] = useState(null)
  const userData = localStorage.getItem('accessToken')
  const url = SERVER.BASE_URL + SERVER.ROUTES.createPet

  useEffect(() => {
    axios.get(url,
      {
        headers: {
          Authorization: `Bearer ${userData}`
        }
      })
    .then(function(response) {
      setPetdata(response.data)
      console.log(response.data)
      console.log("반려동물 정보 불러오기 성공")
    })
    .catch(function() {
      console.log("반려동물 정보 불러오기 실패")
    })
  }, [petdata, url, userData])

  return petdata

}

export { MyProfile, MyPet }