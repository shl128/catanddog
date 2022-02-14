import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './AllChatListItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { EnterRoom } from './ChatAxios'

function AllChatListItem(props) {
  const location = useLocation().pathname
  const canEnter = props.room.userMaxCount > props.room.userNowCount ? true : false
  
  function goChatroom(){
    if (canEnter) {
      EnterRoom(Number(props.room.chatRoomId))
      .then(() => {
        console.log("채팅방 입장 성공")
      })
      .catch(() => {
        console.log("채팅방 입장 실패")
      })
      if(location !== '/Chat' )
      window.location.replace(`/chatting/${props.room.chatRoomId}`) 
    }
  }

  return (
    <div className="All-chat-list-item">
      <div className="chat-left">
        <div>{props.room.chatRoomTitle}</div>
        {props.room.tagName.map((tag, idx) => <span key={idx} className="tag" >#{tag} </span>)}
      </div>
      <div className="chat-right">
        <div>{props.room.userNowCount}/{props.room.userMaxCount}</div>
        <Link to={`/chatting/${props.room.chatRoomId}`} onClick={goChatroom}>
          <FontAwesomeIcon icon={faLongArrowAltRight} size="3x" style={{color: '#ff8767'}}/>
        </Link>
      </div>
    </div>
  )
}

export default AllChatListItem