import React, { useState } from "react";
import styles from "./Voice.module.scss";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";


function Voice() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <h1>Listening</h1>
        <p>{transcript}</p>
      </div>
    </div>
  );
}

export default Voice;
