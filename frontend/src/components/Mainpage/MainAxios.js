import {useEffect, useState} from 'react'
import axios from 'axios'
import SERVER from '../../API/server'

const profileUrl = SERVER.BASE_URL + SERVER.ROUTES.mypage
const petUrl = SERVER.BASE_URL + SERVER.ROUTES.createPet
const userData = localStorage.getItem('accessToken')

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
      console.log("반려동물 정보 불러오기 성공", response.data)
      setPetdata(response.data)
    })
    .catch(function() {
      console.log("반려동물 정보 불러오기 실패")
    })
  }, [])

  return petdata

}

export { MyProfile, ChangeActive, MyPet }