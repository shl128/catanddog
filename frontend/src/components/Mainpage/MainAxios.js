import axios from 'axios'
import SERVER from '../../API/server'

const profileUrl = SERVER.BASE_URL + SERVER.ROUTES.mypage
const petUrl = SERVER.BASE_URL + SERVER.ROUTES.Petpage
const myChatUrl = SERVER.BASE_URL + SERVER.ROUTES.myChatRoom
const ChatUrl = SERVER.BASE_URL + SERVER.ROUTES.userChat
const consultRequest = SERVER.BASE_URL + SERVER.ROUTES.consultRequest
const webChat = SERVER.BASE_URL + SERVER.ROUTES.webChat
const changeActive = SERVER.BASE_URL + SERVER.ROUTES.changeActive
const userData = localStorage.getItem('accessToken')

function MyProfile() {
  return axios.get(profileUrl, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function ChangeActive(data) {
  console.log("정보를 변경합니다", data)
  return axios.patch(changeActive, data, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function MyChatRoom() {
  return axios.get(myChatUrl, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function DeleteChatRoom(chatRoomId) {
  return axios.delete(`${ChatUrl}${chatRoomId}`, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function ExitMyChatRoom(chatRoomId) {
  return axios.delete(`${ChatUrl}exit/${chatRoomId}`, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function MyPet() {
  return axios.get(petUrl, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function ConsultingRequest(data) {
  return axios.post(`${consultRequest}?petContent=${data.petContent}&petKind=${data.petKind}&petName=${data.petName}`, null, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function ConsultingCancel() {
  return axios.delete(consultRequest, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function ConsultingRequestList() {
  return axios.get(consultRequest, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function ConsultingStart(hostId) {
  return axios.delete(`${consultRequest}/${hostId}`, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function ConsultingWait() {
  return axios.get(webChat, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function CreateConsultingRoom(data) {
  return axios.post(`${webChat}?hostId=${data.hostId}&petContent=${data.petContent}&petKind=${data.petKind}&petName=${data.petName}`, null, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function DeleteConsultingRoom() {
  return axios.delete(webChat, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

export { MyProfile, ChangeActive, MyChatRoom, DeleteChatRoom, ExitMyChatRoom, MyPet, ConsultingRequest, ConsultingCancel, ConsultingWait, ConsultingRequestList, ConsultingStart, CreateConsultingRoom, DeleteConsultingRoom}