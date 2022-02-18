import React, { useState, useEffect } from 'react'
import AllChatList from '../../components/Chatpage/AllChatList'
import { AllRoom } from '../../components/Chatpage/ChatAxios'
import ChatSearch from '../../components/Chatpage/ChatSearch'
import CreateChat from '../../components/Chatpage/CreateChat'
import './Chat.css'

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
    <div className="All-chat">
      <ChatSearch setRooms={setRooms}/>
      <CreateChat trigger={trigger} setTrigger={setTrigger} />
      <AllChatList rooms={rooms}/>
    </div>
  )
}

export default Chat