import React from 'react'
import { Link } from 'react-router-dom'
import './AllChatListItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons'

function AllChatListItem(props) {
  return (
    <div className="All-chat-list-item">
      <div className="chat-left">
        <div>{props.room.chatRoomTitle}</div>
        {props.room.tagName.map((tag, idx) => <span key={idx} className="tag" >#{tag} </span>)}
      </div>
      <div className="chat-right">
        <div>{props.room.userNowCount}/{props.room.userMaxCount}</div>
        <Link to={`/chatting/${props.room.chatRoomId}`}>
          <FontAwesomeIcon icon={faLongArrowAltRight} size="3x" style={{color: '#ff8767'}}/>
        </Link>
      </div>
    </div>
  )
}

export default AllChatListItem