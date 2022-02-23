import React, { useState, useEffect } from 'react'
import AllChatList from '../../components/Chatpage/AllChatList'
import { AllRoom, SearchRoomByTitle, SearchRoomByTag } from '../../components/Chatpage/ChatAxios'
import ChatSearch from '../../components/Chatpage/ChatSearch'
import CreateChat from '../../components/Chatpage/CreateChat'
import './Chat.css'

function Chat() {
  const [rooms, setRooms] = useState([])
  const [type, setType] = useState("all")
  const [trigger, setTrigger] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [word, setWord] = useState()

  useEffect(() => {
    console.log(type, word)
    if (type === "all") {
      AllRoom(page)
      .then(response => {
        setRooms(response.data)
        setTotalPage(response.data[0].totalPage)
        console.log("전체 채팅방 조회 성공", response.data)
      })
      .catch(error => {
        console.log("전체 채팅방 조회 실패", error)
      })  
    } else if (type === "title") {
      const data = {word: word, page: page}
      SearchRoomByTitle(data)
      .then(response => {
        setRooms(response.data)
        setTotalPage(response.data[0].totalPage)
        console.log("제목으로 조회 성공", response.data)
      })
      .catch(() =>{
        alert("제목으로 조회 실패")
      })
    } else {
      const data = {word: word, page: page}
      SearchRoomByTag(data)
      .then(response => {
        setRooms(response.data)
        setTotalPage(response.data[0].totalPage)
        console.log("해시태그로 조회 성공", response.data)
      })
      .catch(() =>{
        alert("해시태그로 조회 실패")
      })
    }
  }, [trigger, page, type, word])


  return (
    <div className="All-chat">
      <ChatSearch setRooms={setRooms} setType={setType} trigger={trigger} setTrigger={setTrigger} setPage={setPage} setWord={setWord}/>
      <CreateChat trigger={trigger} setTrigger={setTrigger} page={page} setPage={setPage} totalPage={totalPage} type={type}/>
      <AllChatList rooms={rooms}/>
    </div>
  )
}

export default Chat