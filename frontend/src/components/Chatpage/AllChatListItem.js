import React from 'react'
import { Link } from 'react-router-dom'
import './AllChatListItem.css'

function AllChatListItem(props) {
  return (
    <div className="All-chat-list-item">
      <div className="chat-left">
        <div>{props.room.chatRoomTitle}</div>
        {props.room.tagName.map((tag, idx) => <span key={idx}>#{tag} </span>)}
      </div>
      <div className="chat-right">
        <div>{props.room.userNowCount}/{props.room.userMaxCount}</div>
        <div><Link to="/main">입장하기</Link></div>
      </div>
    </div>
  )
}

export default AllChatListItem