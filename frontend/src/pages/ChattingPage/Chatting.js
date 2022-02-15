import React, {useEffect, useState} from 'react';
import { useParams, useNavigate, useLocation, Navigate } from "react-router-dom";
import VideoRoomComponent from '../../components/VideoChat/VideoRoomComponent';
import './Chatting.css'
import SERVER from '../../API/server'
import axios from 'axios';


function Chatting () {
    const location = useLocation().pathname
    let chatRoomId = useParams().chatRoomId;
    const [nickname, setNickName] = useState('');
    const [userPhoto, setUserPhoto] = useState('');
    const userData =  localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const [userKind, setUserKind] = useState('');

    useEffect(() => {
      // window.location.replace(location)
      // console.log(location)
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
                && <VideoRoomComponent userPhoto={userPhoto} chatroomId={chatRoomId} nickname={nickname} want={true} navigate={navigate} isUserChat="none" userKind={userKind}/>
            }
            
        </div>
    )
}
export default Chatting;