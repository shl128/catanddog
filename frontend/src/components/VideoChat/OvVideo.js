import React, { Component } from 'react';
import './StreamComponent.css';
import FaceTracking from './FaceTracking'

export default class OvVideoComponent extends Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        // console.log('여기봐줘')
        // console.log(this.props.user)
        if (this.props && this.props.user.streamManager && !!this.videoRef) {
            // console.log('PROPS: ', this.props);
            this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
        }

        if (this.props && this.props.user.streamManager.session && this.props.user && !!this.videoRef) {
            this.props.user.streamManager.session.on('signal:userChanged', (event) => {
                const data = JSON.parse(event.data);
                if (data.isScreenShareActive !== undefined) {
                    this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
                }
            });
        }
    }

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
        }
    }

    render() {
        return (
            <>
                <video
                    autoPlay={true}
                    id={'video-' + this.props.user.getStreamManager().stream.streamId}
                    ref={this.videoRef}
                    muted={this.props.mutedSound}
                />
                { this.props.user.isEmojiActive() && <FaceTracking videoRef={this.videoRef} userPhoto={this.props.user.getUserPhoto()}/>}

                {/* {this.props.user.streamManager && } */}
            </>
        );
    }
}
