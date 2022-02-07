import React from 'react'
import { Link } from 'react-router-dom'

function MyChatroomListItem(chatrooms) {
  return chatrooms.map((chatroom) => {
    return (
      <div key={chatroom.chatroom_id} className="My-chat-list-item">
        <span>
          <p>{chatroom.chat_room_title}</p>
          {chatroom.chat_room_tag_names.map((tag, idx) => <span key={idx}>#{tag} </span>)}
        </span>
        <p>
          <span>{chatroom.user_max_count}</span>
          <span><Link to="/">입장하기</Link></span>
        </p>
      </div>
    )
  })
}

export default MyChatroomListItem