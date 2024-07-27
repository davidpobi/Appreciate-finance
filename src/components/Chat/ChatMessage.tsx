"use client";

import { Avatar, Box, Typography } from "@mui/material";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { IChatRoles, IMessageAudio, IMessageObject } from "../../interfaces/chat";
import EqIcon from "@mui/icons-material/GraphicEqOutlined";

interface ChatMessageProps {
  message: IMessageObject;
  messageAudio?: IMessageAudio | null;
  currentPlayingAudioId?: string | null;
  isPlaying?: boolean; // tracks if audio is already playing
  isPlayingCallback?: (state: boolean) => void;
}

const ChatMessage = ({
  message,
  messageAudio,
  currentPlayingAudioId,
  isPlaying,
  isPlayingCallback,
}: ChatMessageProps) => {
  const isUserMessage = message.role === IChatRoles.User;
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [message_, setMessage] = useState<string>("");

  const handlePlayingState = (state: boolean) => {
    setIsPlayingAudio(state);
    isPlayingCallback && isPlayingCallback(state);
  };

  const playAudio = (audio: ArrayBuffer) => {
    // const audioListeners = playAudioStream(audio);
    // audioListeners.onPlay = () => {
    //   handlePlayingState(true);
    // };
    // audioListeners.onFinished = () => {
    //   handlePlayingState(false);
    // };
  };

  const handlePlayMessage = (e: BaseSyntheticEvent) => {
    if (isPlayingAudio || isPlaying) {
      return;
    }
    if (messageAudio !== null && e && message.id !== undefined && messageAudio) {
      playAudio(messageAudio.audio);
      return;
    }
  };

  useEffect(() => {
    if (currentPlayingAudioId === message.id) {
      handlePlayingState(true);
      return;
    }
    handlePlayingState(false);
  }, [currentPlayingAudioId]);

  useEffect(() => {
    if (messageAudio !== null) {
      setIsAudioReady(true);
      return;
    }
    setIsAudioReady(false);
  }, [messageAudio]);

  useEffect(() => {
    console.log("message", message);
    setMessage(message.content);
  }, [message]);

  return (
    <>
      <Box
        component={"div"}
        sx={{
          position: "relative",
          width: "auto",
          minWidth: "120px",
          maxWidth: {
            xs: "75%",
            sm: "65%",
            md: "65%",
          },
          height: "auto",
          minHeight: "50px",
          border: `1.2px solid ${isUserMessage ? "#6262ff" : "#009400"}`,
          background: "transparent",
          borderRadius: "12px",
          display: message.role === IChatRoles.System ? "none" : "flex",
          alignItems: "flex-end",
          justifyContent: "start",
          padding: "0.8rem 1rem 0.8rem 0.5rem",
          mb: 2.2,
          ml: isUserMessage ? "auto" : "10px",
          mr: isUserMessage ? "10px" : "auto",
          overflowWrap: "break-word",
          wordWrap: "break-word",
          wordBreak: "break-word",
          ".txt": {
            marginBottom: !isUserMessage && isAudioReady ? "25px" : "0px",
          },
          ".voice": {
            position: "absolute",
            right: "5px",
            bottom: "5px",
            margin: "5px",
            fontSize: {
              xs: "16px",
              sm: "16px",
              md: "16px",
            },
            color: isPlayingAudio ? "purple" : "inherit",
          },
        }}
      >
        <Typography component={"div"} sx={{ display: "flex" }}>
          {" "}
          <Avatar sx={{ mr: 1, mt: "0", width: "28px", height: "28px", fontSize: isUserMessage ? "16px" : "9px" }}>
            {isUserMessage ? "U" : "Chale"}
          </Avatar>
          <span className="txt"> {message_}</span>
          {!isUserMessage && isAudioReady && (
            <div onClick={handlePlayMessage}>
              <EqIcon className="voice" />
            </div>
          )}
        </Typography>
      </Box>
    </>
  );
};

export default React.memo(ChatMessage);
