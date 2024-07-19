import React, { useState, useRef, useEffect } from 'react';
import './Record.css';

const Record = () => {
  const [recording, setRecording] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  useEffect(() => {
    const initializeVideoPreview = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error initializing video preview:', error);
      }
    };

    initializeVideoPreview();
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        recordedChunksRef.current = [];
        const videoURL = URL.createObjectURL(videoBlob);
        setDownloadUrl(videoURL);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="container">
      <h1>Video Recorder</h1>
      <video ref={videoRef} autoPlay></video>
      <div className="buttons">
        <button onClick={startRecording} disabled={recording}>Start Recording</button>
        <button onClick={stopRecording} disabled={!recording}>Stop Recording</button>
      </div>
      {downloadUrl && <a href={downloadUrl} download="recorded-video.webm" className="download-link">Download Video</a>}
    </div>
  );
};

export default Record;
