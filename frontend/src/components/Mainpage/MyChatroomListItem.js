import React from 'react'
import { Link } from 'react-router-dom'

function MyChatroomListItem(chatrooms) {
  return chatrooms.map((chatroom) => {
    return (
      <div key={chatroom.userChatRoomId} className="My-chat-list-item">
        <span>
          <p>{chatroom.chatRoomTitle}</p>
          {chatroom.tagName.map((tag, idx) => <span key={idx}>#{tag} </span>)}
        </span>
        <p>
          <span>{chatroom.userNowCount}</span>
          <span>{chatroom.userMaxCount}</span>
          <span><Link to="/">입장하기</Link></span>
        </p>
      </div>
    )
  })
}

export default MyChatroomListItem