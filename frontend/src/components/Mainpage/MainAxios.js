import axios from 'axios'
import SERVER from '../../API/server'

const profileUrl = SERVER.BASE_URL + SERVER.ROUTES.mypage
const petUrl = SERVER.BASE_URL + SERVER.ROUTES.createPet
const myChatUrl = SERVER.BASE_URL + SERVER.ROUTES.myChatRoom
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

function MyChatRoom() {
  return axios.get(myChatUrl, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function MyPet() {
  return axios.get(petUrl, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

export { MyProfile, ChangeActive, MyChatRoom, MyPet }