import React from 'react'
import './MyChat.css'
import MyChatroomListItem from './MyChatroomListItem'

function MyChatroomList(props) {
  return (
    <div className="My-chat">
      <h3>내 채팅방</h3>
      <div className="My-chat-list">
        {MyChatroomListItem(props.chatrooms)}
      </div>
    </div>
  )
}

export default MyChatroomList