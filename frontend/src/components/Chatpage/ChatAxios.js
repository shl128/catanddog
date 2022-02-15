import axios from 'axios'
import SERVER from '../../API/server'

const ChatroomUrl = SERVER.BASE_URL + SERVER.ROUTES.userChatroom 
const Chat = SERVER.BASE_URL + SERVER.ROUTES.userChat
const userData = localStorage.getItem('accessToken')

function AllRoom() {
  return axios.get(`${ChatroomUrl}?page=1`, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function SearchRoomByTitle(data) {
  return axios.get(`${ChatroomUrl}title/${data}/?page=1`, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function SearchHashByTitle(data) {
  return axios.get(`${ChatroomUrl}searchTitle/${data}/`, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function SearchRoomByTag(data) {
  return axios.get(`${ChatroomUrl}tags/${data}/?page=1`, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function SearchHashByTag(data) {
  return axios.get(`${ChatroomUrl}searchHash/${data}/`, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function CreateRoom(chatData) {
  console.log("추가할 데이터", chatData)
  return axios.post(Chat, chatData, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

function EnterRoom(chatroomId) {
  return axios.post(`${Chat}${chatroomId}`, null, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}



export { AllRoom, SearchRoomByTag, SearchRoomByTitle, SearchHashByTag, SearchHashByTitle, CreateRoom, EnterRoom }