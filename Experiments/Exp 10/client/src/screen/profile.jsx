import React, { useEffect, useState } from "react";
import PodCards from "./podCards"; 
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import ProfileImg from '../assets/Logo/ltx9i2fys9l91.png'

function Profile() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await axios.get("/api/v1/my-podcasts");
        setPodcasts(res.data.data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get("/api/v1/user");
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error loading profile.</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-xl min-h-screen text-white">
      <div>
        <h2 className="text-2xl text-gray-800 font-bold mb-4">Your Profile</h2>
        <div className="flex flex-col items-center bg-gray-200 rounded-xl p-6">
          <img
            src={ProfileImg}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-700"
          />
          <h1 className="text-2xl text-gray-800 font-bold mb-1">{userData.name}</h1>
          <p className="text-gray-800 mb-2">{userData.email}</p>
          {/* <div className="flex justify-center gap-6 mt-2">
            <div className="text-center">
              <p className="text-2xl text-gray-800 font-bold">
                {userData.totalViews}
              </p>
              <p className="text-sm text-gray-500">Total Views</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-gray-800 font-bold">
                {userData.totalLikes}
              </p>
              <p className="text-sm text-gray-500">Total Likes</p>
            </div>
          </div> */}
        </div>
      </div>
      {podcasts.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-2xl text-gray-800 font-bold mb-4">Your Podcasts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {podcasts.map((podcast, i) => (
              <PodCards key={i} items={podcast} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6">No podcasts available</div>
      )}
    </div>
  );
}

export default Profile;
