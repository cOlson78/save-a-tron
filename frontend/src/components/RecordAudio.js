import React, { useState } from 'react';
import axios from "axios";
import { AudioRecorder, useAudioRecorder} from 'react-audio-voice-recorder';

const RecordAudio = () => {

    const do_transcription = async (audioFile) => {
        try{
            const audio_response = await axios.get(`/send_to_transcribe?audioFile=${audioFile}`);
            console.log(audio_response.data);
        } catch (error) {
            console.error('Error transcribing audio', error);
        }
    }

    const recorderControls = useAudioRecorder()
    const addAudioElement = (blob) => {
      const url = URL.createObjectURL(blob);
      const audio = document.createElement("audio");
      audio.src = url;
      audio.controls = true;
    //   document.body.appendChild(audio);
      let newUrl = url.substring(27, url.length);
      let finalUrl = newUrl.concat(".weba");
      let start = "file:";
      finalUrl = start.concat(url);
      console.log("This is the audiofile: ");
      do_transcription(finalUrl);
    };
  
    return (
        <div style={{height:"40px"}}>
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
          downloadOnSavePress={true}
          //downloadFileExtension="mp3"
          showVisualizer={true}
        />
        {/* <br />
        <button onClick={recorderControls.stopRecording}>Stop recording</button>
        <br /> */}
    
      </div>
    )
  }

export default RecordAudio;