import React, { useState, useEffect } from 'react';
import MyPetList from '../../components/Mainpage/MyPetList';
import Welcome from '../../components/Mainpage/Welcome'
import MyChatroomList from '../../components/Mainpage/MyChatroomList'
import { MyPet, MyChatRoom } from '../../components/Mainpage/MainAxios'


function Main() {
  const [myChatrooms, setMyChatRooms] = useState([])

  useEffect(() =>{
    MyChatRoom()
    .then(response => {
      console.log("내가 속한 채팅방 목록", response.data)
      setMyChatRooms(response.data)
    })
    .catch(() => {
      console.log("내가 속한 채팅방 목록 불러오기 실패")
    })
  }, [])

  const pets = MyPet()

  return (
    <div>
      <Welcome />
      <MyPetList pets={pets} />
      <MyChatroomList chatrooms={myChatrooms} />
    </div>
  )
}

export default Main;
