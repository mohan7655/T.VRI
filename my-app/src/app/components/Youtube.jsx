"use client";
import React from "react";
import ReactPlayer from "react-player";

const YouTubePlayer = ({ videoId }) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  return (
    <div
      style={{
        position: "relative",
        paddingTop: "56.25%",
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        margin: "2rem 0",
      }}
    >
      <ReactPlayer
        src={videoUrl}
        width="100%"
        height="100%"
        controls={true}
        config={{
          youtube: {
            playerVars: { showinfo: 0 },
          },
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default YouTubePlayer;
