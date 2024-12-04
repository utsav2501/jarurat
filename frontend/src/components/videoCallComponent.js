import React, { useState, useEffect } from 'react';
import Peer from 'simple-peer';

const VideoCallComponent = () => {
    const [stream, setStream] = useState(null);
    const [peer, setPeer] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream);
                document.getElementById('local-video').srcObject = stream;
            });
    }, []);

    const startCall = () => {
        const peer = new Peer({ initiator: true, trickle: false, stream: stream });
        peer.on('signal', (data) => {
            console.log('Signal:', data);
        });

        peer.on('stream', (stream) => {
            setRemoteStream(stream);
            document.getElementById('remote-video').srcObject = stream;
        });

        setPeer(peer);
    };

    const acceptCall = (signalData) => {
        const peer = new Peer({ initiator: false, trickle: false, stream: stream });
        peer.signal(signalData);
        peer.on('stream', (stream) => {
            setRemoteStream(stream);
            document.getElementById('remote-video').srcObject = stream;
        });
        setPeer(peer);
    };

    return (
        <div>
            <button onClick={startCall}>Start Call</button>
            <video id="local-video" autoPlay muted />
            <video id="remote-video" autoPlay />
        </div>
    );
};

export default VideoCallComponent;
