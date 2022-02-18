import React from 'react'
import './AllChatListItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { EnterRoom } from './ChatAxios'

function AllChatListItem({room}) {
  const canEnter = room.userMaxCount > room.userNowCount ? true : false
  
  function goChatroom(){
    if (canEnter) {
      EnterRoom(room.chatRoomId)
      .then(() => {
        console.log("채팅방 추가 입장 성공")
      })
      .catch(() => {
        console.log("채팅방 추가 입장 실패")
      })
      window.location.replace(`/chatting/${room.chatRoomId}`) 
    }
  }

  return (
    <div className="All-chat-list-item">
      <div className="chat-left">
        <div>{room.chatRoomTitle}</div>
        {room.tagName.map((tag, idx) => <span key={idx} className="tag" >#{tag} </span>)}
      </div>
      <div className="chat-right">
        <div>{room.userNowCount}/{room.userMaxCount}</div>
        <FontAwesomeIcon className={canEnter ? "chat-enter" : "chat-full"} onClick={goChatroom} icon={faLongArrowAltRight} size="3x"/>
      </div>
    </div>
  )
}

export default AllChatListItem