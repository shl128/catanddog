import React, {useEffect, useState} from 'react';
import { useParams, useNavigate, Navigate } from "react-router-dom";
import VideoRoomComponent from '../../components/VideoChat/VideoRoomComponent';
import './Diagnosischat.css'
import SERVER from '../../API/server'
import axios from 'axios';


function Diagnosischat () {
    let chatRoomId = useParams().chatRoomId;
    const [nickname, setNickName] = useState('');
    const [userPhoto, setUserPhoto] = useState('');
    const [userKind, setUserKind] = useState('');
    const userData =  localStorage.getItem('accessToken');
    const navigate = useNavigate();

    
    useEffect(() => {
    axios.get(SERVER.BASE_URL + SERVER.ROUTES.mypage,
      {headers: {
        Authorization: `Bearer ${userData}`
      }})
      .then(res => {
        setNickName(res.data.userNickname)
        setUserPhoto(res.data.userPhoto)
        setUserKind(res.data.userKind)
      })
      .catch(err => {
        console.log(err)
      })
    }, []);

    if (!userData) {
      return <Navigate to="/login" replace={true} />
    }

    return (
        <div className='Chatting'>
            {
                nickname !== '' 
                && <VideoRoomComponent userPhoto={userPhoto} chatroomId={chatRoomId} nickname={nickname} want={true} navigate={navigate} isUserChat="display" userKind={userKind}/>
            }
            
        </div>
    )
}
export default Diagnosischat;