import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Send from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import SERVER from '../../API/server';
import axios from 'axios';

import './ChatComponent.css';
// d

export default class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: [],
            message: '',
        };
        this.chatScroll = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handlePressKey = this.handlePressKey.bind(this);
        this.close = this.close.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }


    componentDidMount() {
        this.props.user.getStreamManager().stream.session.on('signal:chat', (event) => {
            const data = JSON.parse(event.data);
            let messageList = this.state.messageList;
            console.log(data)
            axios.get(SERVER.BASE_URL + SERVER.ROUTES.mypage + '/{user_nickname_photo}?userNickname=' + data.nickname)
            .then(res=> {   
                messageList.push({ connectionId: event.from.connectionId, nickname: data.nickname, message: data.message, img: res.data});
                console.log(messageList)
                // const document = window.document;
                // setTimeout(() => {
                //     const userImg = document.getElementById('userImg-' + (this.state.messageList.length - 1));
                //     const video = document.getElementById('video-' + data.streamId);
                //     const avatar = userImg.getContext('2d');
                //     avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
                //     this.props.messageReceived();
                // }, 50);
            })
            .then(res => {          
                this.setState({ messageList: messageList });
                this.scrollToBottom();
            })
            .catch(err => {
                console.log(err)
                messageList.push({ connectionId: event.from.connectionId, nickname: data.nickname, message: data.message, img: ''});
                this.setState({ messageList: messageList });
                this.scrollToBottom();
            })

        });
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }

    handlePressKey(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    sendMessage() {
        // console.log(this.state.message);
        if (this.props.user && this.state.message) {
            let message = this.state.message.replace(/ +(?= )/g, '');
            if (message !== '' && message !== ' ') {
                const data = { message: message, nickname: this.props.user.getNickname(), streamId: this.props.user.getStreamManager().stream.streamId };
                this.props.user.getStreamManager().stream.session.signal({
                    data: JSON.stringify(data),
                    type: 'chat',
                });
            }
        }
        // 여기에 프로필 사진 주소 요청
        this.setState({ message: '' });
    }

    scrollToBottom() {
        setTimeout(() => {
            try {
                this.chatScroll.current.scrollTop = this.chatScroll.current.scrollHeight;
            } catch (err) {}
        }, 20);
    }

    close() {
        this.props.close(undefined);
    }

    render() {
        const styleChat = { display: this.props.chatDisplay };
        return (
            <div id="chatContainer">
                <div id="chatComponent" style={styleChat}>
                    {/* <div id="chatToolbar">
                        <span>room - {this.props.user.getStreamManager().stream.session.sessionId} - CHAT</span>
                        <IconButton id="closeButton" onClick={this.close}>
                            <CloseIcon  />
                        </IconButton>
                    </div> */}
                    <div className="message-wrap" ref={this.chatScroll}>
                        {this.state.messageList.map((data, i) => (
                            <div
                                key={i}
                                id="remoteUsers"
                                className={
                                    'message' + (data.connectionId !== this.props.user.getConnectionId() ? ' left' : ' right')
                                }
                            >   {
                                    data.img === ""
                                    ?
                                    <img src={process.env.PUBLIC_URL + '/image/logo.png'} alt="img" width="60" height="60" className="user-img" />
                                    :
                                    <img src={'data:image/png;base64,' + data.img } alt="img" width="60" height="60" className="user-img" />
                                }
                                <div className="msg-detail">
                                    <div className="msg-info">
                                        <p> {data.nickname}</p>
                                    </div>
                                    <div className="msg-content">
                                        <span className="triangle" />
                                        <p className="text">{data.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div id="messageInput">
                        <input
                            placeholder="메시지 입력"
                            id="chatInput"
                            value={this.state.message}
                            onChange={this.handleChange}
                            onKeyPress={this.handlePressKey}
                        />
                            <Fab size="small" id="sendButton" onClick={this.sendMessage}>
                                <Send />
                            </Fab>
                    </div>
                </div>
            </div>
        );
    }
}
