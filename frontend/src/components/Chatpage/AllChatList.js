import React, { useState, useEffect } from 'react'
import { AllRoom } from './ChatAxios'
import AllChatListItem from './AllChatListItem'
import './AllChatList.css'

function AllChatList() {
  
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    AllRoom()
    .then(response => {
      setRooms(response.data)
      console.log("전체 채팅방 조회 성공", response.data)
    })
    .catch(error => {
      console.log("전체 채팅방 조회 실패", error)
    })
  }, [])

  return rooms.map((room) => {
    return (
      <div key={room.chatRoomId} className="AllChatList">
        <AllChatListItem room={room} />
      </div>
    )
  })
}

export default AllChatList