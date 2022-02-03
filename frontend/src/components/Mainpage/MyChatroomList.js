import React from 'react'
import './MyChat.css'
import MyChatroomListItem from './MyChatroomListItem'
import MyChatSearch from './MyChatSearch'

function MyChatroomList(props) {
  return (
    <div className="My-chat">
      <div className="My-chat-search">
        <h3>내 채팅방</h3>
        <MyChatSearch />
      </div>
      <div className="My-chat-list">
        {MyChatroomListItem(props.chatrooms)}
      </div>
    </div>
  )
}

export default MyChatroomList