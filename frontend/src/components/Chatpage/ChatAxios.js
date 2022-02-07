import axios from 'axios'
import SERVER from '../../API/server'

const ChatroomUrl = SERVER.BASE_URL + SERVER.ROUTES.chatroom + '?page=1'
const userData = localStorage.getItem('accessToken')

function AllRoom() {
  return axios.get(ChatroomUrl, {
    headers: { Authorization: `Bearer ${userData}` }
  })
}

export { AllRoom }