import React, { useState, useRef } from 'react';
import microphoneIcon from '../assets/microphone.png';
import "../styles/RecordAudio.css";


const RecordAudio = ({ onFinish }) => {
      //Loads hooks
      const [isRecording, setIsRecording] = useState(false);
      const [audioBlob, setAudioBlob] = useState(null);
      const mediaRecorderRef = useRef(null);

      //Function for recording audio
      const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        setIsRecording(true);

        mediaRecorderRef.current.ondataavailable = (event) => {
          setAudioBlob(event.data);
        };

        mediaRecorderRef.current.start();
      };

      //Stops recording
      const stopRecording = () => {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
        setIsRecording(false);

        sendAudio();
      };
      

      const sendAudio = async () => {
    	if (!audioBlob) {
    	  console.log("No audio recorded.");
    	  return;
    	}
      
    	console.log("Sending audio...");
      
    	const formData = new FormData();
    	formData.append("audio", audioBlob, "recording.wav");
      
      //Tries to send the data to the backend
    	try {
    	  const response = await fetch("http://localhost:5000/send_to_transcribe", {
          method: "POST",
          body: formData,
    	  });
      
    	  if (!response.ok) {
          console.log("Error in response:", response.statusText);
          return;
    	  }
      
    	  const data = await response.json();
    	  alert(`Transcription: ${data.transcription}`);
        onFinish(data.transcription);
    	} catch (error) {
    	    console.error("Error sending audio:", error);
    	}
      };
      

      return (
        <div className="audio_div">
          <button className="rec_btn" onClick={isRecording ? stopRecording : startRecording}>
            {isRecording ? <img className="microphone_img_use" src={microphoneIcon} alt="Microphone"></img> : <img className="microphone_img" src={microphoneIcon} alt="Microphone"></img>}
          </button>
        </div>
      );
  };

export default RecordAudio;