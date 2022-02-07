import React from 'react'
import AllChatList from '../../components/Chatpage/AllChatList'
import ChatSearch from '../../components/Chatpage/ChatSearch'
import CreateChat from '../../components/Chatpage/CreateChat'

function Chat() {
  return (
    <div>
      <h3>유저들과 소통</h3>
      <ChatSearch />
      <div>
        <CreateChat />
        <AllChatList />
      </div>
    </div>
  )
}

export default Chat