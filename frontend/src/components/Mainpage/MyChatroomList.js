import React from 'react'
import './MyChatroomList.css'
import MyChatroomListItem from './MyChatroomListItem'

function MyChatroomList(props) {
  return (
    <div>
      <div className="My-chat">내 채팅방</div>
      <div className="My-chat-list">
        {props.myChatrooms.map((chatroom) => {
          return <MyChatroomListItem key={chatroom.chatRoomId} chatroom={chatroom} setTrigger={props.setTrigger} trigger={props.trigger}/>
        })}
      </div>
    </div>
  )
}

export default MyChatroomList