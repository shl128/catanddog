import React, { Component } from 'react';
import './ToolbarComponent.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import SwitchVideoIcon from '@material-ui/icons/SwitchVideo';
import PictureInPicture from '@material-ui/icons/PictureInPicture';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import Tooltip from '@material-ui/core/Tooltip';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import PetsIcon from '@material-ui/icons/Pets';
import DateRangeIcon from '@material-ui/icons/DateRange';

import IconButton from '@material-ui/core/IconButton';

const logo = require('../../components/image/상단로고.png');

export default class ToolbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { fullscreen: false };
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
    }


    micStatusChanged() {
        this.props.micStatusChanged();
    }

    camStatusChanged() {
        this.props.camStatusChanged();
    }

    screenShare() {
        this.props.screenShare();
    }

    stopScreenShare() {
        this.props.stopScreenShare();
    }

    toggleFullscreen() {
        this.setState({ fullscreen: !this.state.fullscreen });
        this.props.toggleFullscreen();
    }

    switchCamera() {
        this.props.switchCamera();
    }

    
    leaveSession() {
        this.props.leaveSession();
    }

    toggleChat() {
        this.props.toggleChat();
    }

    render() {
        const mySessionId = this.props.sessionId;
        const localUser = this.props.user;
        return (
            <div id="header">
                <div  className="toolbar">
                    <div className="buttonsContent">
                        <IconButton color="secondary" className="outButton" onClick={this.leaveSession} id="navLeaveButton">
                            <PowerSettingsNew />
                            <div className='outFont'>나가기</div>
                        </IconButton>
                            <div className='roomName'>
                                {this.props.sessionId && <div id="titleContent">
                                    <span id="session-title">방번호: {mySessionId}</span>
                                </div>}
                            </div>
                        <IconButton color="inherit" className="muteButton" onClick={this.micStatusChanged}>
                            {localUser !== undefined && localUser.isAudioActive() ? <div><Mic /> <div className='font'>음소거</div></div> : <div><MicOff color="secondary" /><div className='font'>음소거 해제</div></div>}
                        </IconButton>

                        <IconButton color="inherit" className="navButton" id="navCamButton" onClick={this.camStatusChanged}>
                            {localUser !== undefined && localUser.isVideoActive() ? (
                                <div><Videocam /><div className='font'>비디오 중지</div></div>
                            ) : (
                                <div><VideocamOff color="secondary" /><div className='font'>비디오 재생</div></div>
                            )}
                        </IconButton>

                        <IconButton color="inherit" className="navButton" onClick={this.screenShare}>
                            {localUser !== undefined && localUser.isScreenShareActive() ? <div><PictureInPicture /><div className='font'>공유 중지</div></div> : <div><ScreenShare /><div className='font'>화면 공유</div></div>}
                        </IconButton>

                        {localUser !== undefined &&
                            localUser.isScreenShareActive() && (
                                <div>                                
                                    <IconButton onClick={this.stopScreenShare} id="navScreenButton">
                                    <StopScreenShare color="secondary" />
                                    </IconButton>
                                    <div className='font'>공유 중지</div>
                                </div>
                            )}

                        <IconButton color="inherit" className="navButton" onClick={this.toggleFullscreen}>
                            {localUser !== undefined && this.state.fullscreen ?  <div><FullscreenExit /><div className='font'>화면 복귀</div></div> :  <div><Fullscreen /><div className='font'>전체 화면</div></div>}
                        </IconButton>

                        <IconButton color="inherit" className="navButton" >
                            {localUser !== undefined ?  <div><PetsIcon /><div className='font'>얼굴 변환</div></div> :  <div><PetsIcon /><div className='font'>얼굴 복구</div></div>}
                        </IconButton>

                        <IconButton color="inherit" className="navButton" >
                            {localUser !== undefined ?  <div><DateRangeIcon /><div className='font'>캘린더</div></div> :  <div><DateRangeIcon /><div className='font'>캘린더</div></div>}
                        </IconButton>

                        <IconButton color="inherit" onClick={this.toggleChat} className="chatButton">
                            {this.props.showNotification && <div id="point" className="" />}
                            <div>
                                <Tooltip >
                                    <QuestionAnswer />
                                </Tooltip>
                                <div className='font'>채팅</div>
                            </div>                   
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }
}
