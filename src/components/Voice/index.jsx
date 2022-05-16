import React, { useState } from "react";
import styles from "./Voice.module.scss";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";

function Voice({ transcript, isSupport, listening}) {
  if (!isSupport) {
    return (
      <div className={styles.container}>
        <div className={styles.body}>
          <h1>
            Trình duyệt không hỗ trợ chức năng này, quý khách vui lòng thông cảm
          </h1>
        </div>
      </div>
    );
  }

  return (
    <>
      {listening && (
        <div className={styles.container}>
          <div className={styles.body}>
            <h1>Listening...</h1>
            {listening ? <KeyboardVoiceIcon /> : <MicOffIcon />}
            <p>{transcript}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Voice;
