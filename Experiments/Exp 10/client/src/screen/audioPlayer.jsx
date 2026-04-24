import React, { useEffect, useRef, useState } from "react";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { FaPlay, FaPause } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../store/player";

function AudioPlayer() {
  const dispatch = useDispatch();
  const PlayerDivState = useSelector((state) => state.player.isPlayerDiv);
  const songPath = useSelector((state) => state.player.songPath);
  const img = useSelector((state) => state.player.songImg);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef();

  const closeAudioPlayer = (e) => {
    e.preventDefault();
    dispatch(playerActions.closeDiv());
    dispatch(playerActions.changeSong(""));
    dispatch(playerActions.changeImg(""));
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  useEffect(() => {
    if (songPath) {
      const playAudio = async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        }
      };
      playAudio();
    }
  }, [songPath]);

  return (
    <div
      className={`${
        PlayerDivState ? "fixed" : "hidden"
      } bottom-0 left-0 w-full bg-zinc-800/80 text-zinc-300 p-4 rounded-lg shadow-lg backdrop-blur-md flex items-center`}
    >
      <div className="hidden md:block w-1/4">
        <img src={img} alt="audio" className="w-16 h-16 rounded-lg shadow-md" />
      </div>

      <div className="w-full md:w-2/4 flex flex-col items-center">
        {/* <div className="text-center text-sm font-semibold text-white mb-2">
          <p>Now Playing</p>
          <p className="truncate">
            {songPath ? songPath.split("/").pop() : "No song selected"}
          </p>
        </div> */}
        
        <div className="w-full flex justify-center gap-6 text-2xl mb-3">
          <button className="hover:text-red-500 transition-colors">
            <IoPlaySkipBack />
          </button>
          <button
            onClick={togglePlayPause}
            className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className="hover:text-red-500 transition-colors">
            <IoPlaySkipForward />
          </button>
        </div>

        <div className="w-full flex items-center gap-2 text-xs">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full accent-red-500"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="w-1/4 flex items-center justify-end">
        <button
          onClick={closeAudioPlayer}
          className="text-white p-2 hover:text-red-500 transition-colors"
        >
          <ImCross />
        </button>
      </div>

      <audio
        src={songPath}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden"
      ></audio>
    </div>
  );
}

export default AudioPlayer;
