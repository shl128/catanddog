import React, { useState, useEffect } from 'react'
import AllChatList from '../../components/Chatpage/AllChatList'
import { AllRoom } from '../../components/Chatpage/ChatAxios'
import ChatSearch from '../../components/Chatpage/ChatSearch'
import CreateChat from '../../components/Chatpage/CreateChat'
import './Chat.css'

function Chat() {
  const [rooms, setRooms] = useState([])
  const [type, setType] = useState("all")
  const [trigger, setTrigger] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  useEffect(() => {
    AllRoom(page)
    .then(response => {
      setRooms(response.data)
      setTotalPage(response.data[0].totalPage)
      console.log("전체 채팅방 조회 성공", response.data)
    })
    .catch(error => {
      console.log("전체 채팅방 조회 실패", error)
    })
  }, [trigger, page])


  return (
    <div className="All-chat">
      <ChatSearch setRooms={setRooms} setType={setType}/>
      <CreateChat trigger={trigger} setTrigger={setTrigger} page={page} setPage={setPage} totalPage={totalPage} type={type}/>
      <AllChatList rooms={rooms}/>
    </div>
  )
}

export default Chat