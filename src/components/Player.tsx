import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
import { stations } from "../stations";
import styled, { keyframes, css } from "styled-components";

// 🔄 Rotation Animation for Album Art (only when playing)
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
// 🎵 Styled Album Art with Conditional Rotation
const StyledImage = styled.img<{ isPlaying: boolean }>`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  box-shadow: 1px 1px 20px black;
  transition: transform 0.3s ease-in-out;

  ${({ isPlaying }) =>
    isPlaying &&
    css`
      animation: ${rotate} 5s linear infinite;
    `}
`;

// 📌 Wrapper for Full Page Background
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: black;
  color: white;
  width: 100vw;
`;

// 🎶 Custom Audio Player Styling
const StyledAudioPlayer = styled(AudioPlayer)`
  .rhap_progress-container {
    display: none !important;
  }

  .rhap_progress-bar {
    display: none !important;
  }

  .player {
    text-align: center;
  }
`;

const Player = () => {
  const [station, setStation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🔄 Play/Pause State Handling
  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    document.addEventListener("audio-play", handlePlay);
    document.addEventListener("audio-pause", handlePause);

    return () => {
      document.removeEventListener("audio-play", handlePlay);
      document.removeEventListener("audio-pause", handlePause);
    };
  }, []);

  // 🔄 Next Station
  const handleClickNext = () => {
    setStation((currentTrack) =>
      currentTrack < stations.length - 1 ? currentTrack + 1 : 0
    );
  };

  // 🔁 Previous Station
  const handleClickPrevious = () => {
    setStation((currentTrack) =>
      currentTrack === 0 ? stations.length - 1 : currentTrack - 1
    );
  };

  return (
    <Wrapper>
      <div
        className="player"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "10px",
          marginBottom: "1rem",
          backgroundColor: "aliceblue",
          boxShadow: "0.3rem 0rem 8rem #8707f7",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 🎵 Rotating Album Art (only when playing) */}
        <StyledImage
          src={stations[station].albumArt}
          alt="Album Art"
          isPlaying={isPlaying}
        />

        {/* 🎙️ Station Name */}
        <h2
          style={{
            color: "black",
            textAlign: "center",
            marginTop: "10px",
            fontSize: "1.5rem",
            padding: "10px",
          }}
        >
          {stations[station]?.name || "Unknown Station"}
        </h2>

        {/* 🎚️ Audio Player */}
        <StyledAudioPlayer
          style={{
            borderBottomRightRadius: "20px",
            borderBottomLeftRadius: "20px",
            marginTop: "20px",
            backgroundColor: "white",
          }}
          src={stations[station].path}
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrevious}
          showSkipControls={true}
          autoPlay
          showJumpControls={false}
          showFilledVolume={true}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    </Wrapper>
  );
};

export default Player;
