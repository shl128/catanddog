import React from 'react'
import './MyChatroomList.css'
import MyChatroomListItem from './MyChatroomListItem'

function MyChatroomList(props) {
  return (
    <div className="My-chat-list">
      <h3>내 채팅방</h3>
      {props.myChatrooms.map((chatroom) => {
        return <MyChatroomListItem key={chatroom.chatRoomId} chatroom={chatroom}/>
      })}
    </div>
  )
}

export default MyChatroomList