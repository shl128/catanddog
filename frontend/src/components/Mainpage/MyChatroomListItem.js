import React from 'react'
import { Link } from 'react-router-dom'
import './MyChatroomListItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons'

function MyChatroomListItem({chatroom}) {
  return (
    <div className="My-chat-list-item">
      <div>
        <div>{chatroom.chatRoomTitle}</div>
        {chatroom.tagName.map((tag, idx) => <span key={idx} className="tag" >#{tag}</span>)}
      </div>
      <div className="My-chat-list-item-right">
        <span>{chatroom.userNowCount}/{chatroom.userMaxCount}</span>
        <Link to={`/chatting/${chatroom.chat_room_id}`}>
          <FontAwesomeIcon icon={faLongArrowAltRight} size="3x" style={{color: '#ff8767'}}/>
        </Link>
      </div>
    </div>
  )
}

export default MyChatroomListItem