import React from 'react'
import { Link, useLocation,  } from 'react-router-dom'
import './MyChatroomListItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { ExitMyChatRoom, DeleteChatRoom } from './MainAxios'


function MyChatroomListItem({chatroom, trigger, setTrigger}) {
  const location = useLocation().pathname

  
  function goChatroom() {
    if(location !== '/')
    window.location.replace(`/chatting/${chatroom.chatRoomId}`)
  }

  function exitChatroom() {

    if (window.confirm("정말 나갈까요?")) {
      ExitMyChatRoom(chatroom.chatRoomId)
      .then(() => {
        console.log("채팅방 나가기 성공")
        setTrigger(!trigger)
      })
      .then(() => {
        if (chatroom.userNowCount === 1) {
          DeleteChatRoom(chatroom.chatRoomId)
          .then(() => {
            console.log("채팅방 삭제 성공")
          })
          .catch(() => {
            console.log("채팅방 삭제 실패")
          })
        }
      })
      .catch(() => {
        console.log("채팅방 나가기 실패")
      })
    }

  }

  return (
    <div className="My-chat-list-item">
      <div>
        <div>{chatroom.chatRoomTitle}</div>
        {chatroom.tagName.map((tag, idx) => <span key={idx} className="tag" >#{tag}</span>)}
      </div>
      <div className="My-chat-list-item-right">
        <span>{chatroom.userNowCount}/{chatroom.userMaxCount}</span>
        <Link to={`/chatting/${chatroom.chatRoomId}`} state={{ fromDashboard: true }} onClick={goChatroom}>
          <FontAwesomeIcon icon={faLongArrowAltRight} size="3x" style={{color: '#ff8767'}}/>
        </Link>
        <button className="My-chat-list-item-exit" onClick={exitChatroom}>
          X
        </button>
      </div>
    </div>
  )
}

export default MyChatroomListItem