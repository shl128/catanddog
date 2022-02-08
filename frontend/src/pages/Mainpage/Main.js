import React from 'react';
import MyPetList from '../../components/Mainpage/MyPetList';
import Welcome from '../../components/Mainpage/Welcome'
import MyChatroomList from '../../components/Mainpage/MyChatroomList'
import { MyPet } from '../../components/Mainpage/MainAxios'


function Main() {

  const chatrooms = [
    {chat_room_id: 1, chat_room_title: '고양이 토', user_max_count: 6, chat_room_tag_names: ['고양이', '토', '궁금해요']},
    {chat_room_id: 2, chat_room_title: '강아지 훈련', user_max_count: 6, chat_room_tag_names: ['강아지', '훈련', '궁금해요']}
  ]

  const pets = MyPet()

  return (
    <div>
      <Welcome />
      <MyPetList pets={pets} />
      <MyChatroomList chatrooms={chatrooms} />
    </div>
  )
}

export default Main;
