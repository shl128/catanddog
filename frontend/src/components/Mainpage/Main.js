import React from 'react';
import MyPetList from './MyPetList';
import Welcome from './Welcome'
import MyChatroomList from './MyChatroomList'
import MyProfile from './MainAxios';


function Main() {
  const pets = [
    {pet_id: 1, pet_name: '쫑', pet_breed: '스피츠', pet_birthday: '2015-01-01'},
    {pet_id: 2, pet_name: '쿠키', pet_breed: '코리안 숏헤어', pet_birthday: '2019-01-01'}
  ]

  const chatrooms = [
    {chat_room_id: 1, chat_room_title: '고양이 토', user_max_count: 6, chat_room_tag_names: ['고양이', '토', '궁금해요']},
    {chat_room_id: 2, chat_room_title: '강아지 훈련', user_max_count: 6, chat_room_tag_names: ['강아지', '훈련', '궁금해요']}
  ]

  return (
    <div>
      <MyProfile />
      <Welcome name="진용" />
      <MyPetList pets={pets} />
      <MyChatroomList chatrooms={chatrooms} />
    </div>
  )
}

export default Main;
