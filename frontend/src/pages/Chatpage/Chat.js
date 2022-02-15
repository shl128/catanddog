import React, { useState, useEffect } from 'react'
import AllChatList from '../../components/Chatpage/AllChatList'
import { AllRoom } from '../../components/Chatpage/ChatAxios'
import ChatSearch from '../../components/Chatpage/ChatSearch'
import CreateChat from '../../components/Chatpage/CreateChat'

function Chat() {
  const [rooms, setRooms] = useState([])
  const [trigger, setTrigger] = useState(true)

  useEffect(() => {
    AllRoom()
    .then(response => {
      setRooms(response.data)
      console.log("전체 채팅방 조회 성공", response.data)
    })
    .catch(error => {
      console.log("전체 채팅방 조회 실패", error)
    })
  }, [trigger])


  return (
    <div>
      <h3>유저들과 소통</h3>
      <ChatSearch setRooms={setRooms}/>
      <div>
        <CreateChat trigger={trigger} setTrigger={setTrigger}/>
        <AllChatList rooms={rooms}/>
      </div>
    </div>
  )
}

export default Chat