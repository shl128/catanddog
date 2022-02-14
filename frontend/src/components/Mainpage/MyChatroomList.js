import React from 'react'
import './MyChatroomList.css'
import MyChatroomListItem from './MyChatroomListItem'

function MyChatroomList(props) {
  return (
    <div>
      <h3>내 채팅방</h3>
      <div className="My-chat-list">
        {props.myChatrooms.map((chatroom) => {
          return <MyChatroomListItem key={chatroom.chatRoomId} chatroom={chatroom}/>
        })}
      </div>
    </div>
  )
}

export default MyChatroomList