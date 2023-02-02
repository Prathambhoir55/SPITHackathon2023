import React from 'react'
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder'
import axios from 'axios';
import Webcam from "react-webcam"
import { Button, Button2, InputTag, SectionHeader } from '../components';
import im from "./robo.png"
const Interview = () => {
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
        {
            video: true,
            blobPropertyBag: { type: "video/mp4" },
        }
    );

    React.useEffect(() => {

        async function uploadVoice() {
            const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
            const audiofile = new File([audioBlob], "video/mp4", {
                type: "video/mp4",
            });
            console.log(audiofile);
            const formData = new FormData();
            formData.append("file", audiofile);
            await axios.post(
                // endPoint,
                formData,
                {
                    "content-type": "multipart/form-data",
                }
            );

        }
        if (mediaBlobUrl) {
            uploadVoice();
        }

    }, [mediaBlobUrl]);

    return (
        <div>
            {/* <center> */}

            <div className="grid grid-cols-2">
            <div>
                <img src={im} alt="robot" style={{height:"400px"}}/>
                <br/>
                <p>Hello How are you ?</p>
            </div>
                <div>
                    <Webcam />
                    <br />
                    <SectionHeader>Status : {status}</SectionHeader>
                    <br />
                    <Button2 onClick={startRecording}>Start Recording</Button2>
                    <Button2 onClick={stopRecording}>Stop Recording</Button2>
                </div>
            </div>
            {/* <video src={mediaBlobUrl} controls autoPlay loop /> */}
            {/* </center> */}
            {/* <ReactMediaRecorder
                audio
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <p>{status}</p>
                        <button onClick={startRecording}>Start Recording</button>
                        <button onClick={stopRecording}>Stop Recording</button>
                        <video src={mediaBlobUrl} controls autoPlay loop />
                    </div>
                )}
            /> */}
        </div>
    )
}

export default Interview