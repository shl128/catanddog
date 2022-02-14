import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import VideoRoomComponent from '../../components/VideoChat/VideoRoomComponent';
import './Diagnosischat.css'
import SERVER from '../../API/server'
import axios from 'axios';


function Diagnosischat () {
    let chatRoomId = useParams().chatRoomId;
    const [nickname, setNickName] = useState('');
    const [userPhoto, setUserPhoto] = useState('');
    const userData =  localStorage.getItem('accessToken')
    const navigate = useNavigate()

    
    useEffect(() => {
    axios.get(SERVER.BASE_URL + SERVER.ROUTES.mypage,
      {headers: {
        Authorization: `Bearer ${userData}`
      }})
      .then(res => {
        setNickName(res.data.userNickname)
        setUserPhoto(res.data.userPhoto)
      })
      .catch(err => {
        console.log(err)
      })
    }, []);

    return (
        <div className='Chatting'>
            {
                nickname !== '' 
                && <VideoRoomComponent userPhoto={userPhoto} chatroomId={chatRoomId} nickname={nickname} want={true} navigate={navigate} isUserChat="display"/>
            }
            
        </div>
    )
}
export default Diagnosischat;