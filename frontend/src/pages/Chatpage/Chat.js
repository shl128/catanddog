import React from 'react'
import AllChatList from '../../components/Chatpage/AllChatList'
import CreateChat from '../../components/Chatpage/CreateChat'

function Chat() {
  return (
    <div>
      <h3>유저들과 소통</h3>
      <h3>검색폼</h3>
      <div>
        <CreateChat />
        <AllChatList />
      </div>
    </div>
  )
}

export default Chat