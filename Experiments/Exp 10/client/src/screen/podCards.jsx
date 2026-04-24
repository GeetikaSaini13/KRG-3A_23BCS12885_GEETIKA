import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeadphones } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { playerActions } from "../store/player";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

function PodCards({ items }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [heartRed, setHeartRed] = useState(false);
  const dispatch = useDispatch();

  const handleHeart = () => {
    setHeartRed(!heartRed);
  };

  const handlePlay = (e) => {
    if (isLoggedIn) {
      e.preventDefault();
      dispatch(
        playerActions.changeSong(`http://localhost:5003/${items.audioFile}`)
      );
      dispatch(
        playerActions.changeImg(`http://localhost:5003/${items.frontImage}`)
      );
      dispatch(playerActions.setDiv());
    } else {
      // alert("Please login to play the podcast");
      toast.error("Please login to play the podcast");
    }
  };

  return (
    <div className="container w-64 min-h-[48vh] mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 duration-500 relative">
      {/* <ToastContainer /> */}
      <div className="relative w-full h-40 bg-white rounded-t-xl overflow-hidden">
        <img
          src={
            `http://localhost:5003/${items.frontImage}` || "default-image.jpg"
          }
          className="w-full h-full object-cover"
          alt={items.title || "Image"}
          onError={(e) => (e.target.src = "default-image.jpg")}
        />
      </div>

      <button
        onClick={handleHeart}
        className="absolute top-2 right-2 bg-white p-2 shadow-lg rounded-full transition-all duration-300"
      >
        {heartRed ? (
          <FaHeart className="text-red-400 cursor-pointer transition-transform transform scale-125 ease-in-out duration-200" />
        ) : (
          <FaHeart className="text-[#E0E0E0] cursor-pointer transition-transform transform scale-100 ease-in-out duration-200" />
        )}
      </button>

      <div className="relative py-3">
        <button
          onClick={handlePlay}
          className="absolute transform -top-10 lg:left-[6vw] left-[25vw] flex z-50 text-orange-500 rounded-full bg-white hover:text-orange-400 transition-all duration-200 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="text-center absolute left-0 right-0 bottom-0 px-4 py-6">
        <h1 className="mb-2 text-xl line-clamp-1 font-semibold text-gray-800 hover:text-gray-900 cursor-pointer transition-colors duration-300">
          {items.title || "Podcast Title"}
        </h1>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {items.description || "Podcast Description"}
        </p>
        <div className="flex justify-between items-center">
          <span className="inline-block text-xs text-gray-500 font-medium bg-gray-100 py-1 px-3 rounded-full">
            {items.category?.categoryName || "Category"}
          </span>
          <span className="flex flex-col items-start justify-center text-xs text-gray-500 font-medium py-1 px-3 rounded-full">
            <p>Total Listen: 12</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PodCards;
