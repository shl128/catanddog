import React, { useState, useEffect } from 'react';
import MyPetList from '../../components/Mainpage/MyPetList';
import Welcome from '../../components/Mainpage/Welcome'
import MyChatroomList from '../../components/Mainpage/MyChatroomList'
import { MyPet, MyChatRoom, MyProfile } from '../../components/Mainpage/MainAxios'


function Main() {
  const [myChatrooms, setMyChatRooms] = useState([])
  const [pets, setPets] = useState([])
  const [userData, setUserData] = useState([])

  useEffect(() =>{
    MyChatRoom()
    .then(response => {
      console.log("내가 속한 채팅방 목록", response.data)
      setMyChatRooms(response.data)
    })
    .catch(() => {
      console.log("내가 속한 채팅방 목록 불러오기 실패")
    })

    MyPet()
    .then(response => {
      console.log("내 반려동물 정보", response.data)
      setPets(response.data)
    })
    .catch(() => {
      console.log("내 반려동물 정보 불러오기 실패")
    })

    MyProfile()
    .then(response => {
      setUserData(response.data)
    })
    .catch(() => {
      console.log("회원정보 가져오기 실패")
    })
  }, [])

  return (
    <div>
      <Welcome userData={userData}/>
      <MyPetList pets={pets} />
      <MyChatroomList myChatrooms={myChatrooms} />
    </div>
  )
}

export default Main;
