import React from 'react'
import AllChatListItem from './AllChatListItem'
import './AllChatList.css'

function AllChatList({rooms}) {
  return (
    <div className="AllChatList">
      {rooms.map((room) => {
        return <AllChatListItem key={room.chatRoomId} room={room}/>
      })}
    </div>
  )
}

export default AllChatList