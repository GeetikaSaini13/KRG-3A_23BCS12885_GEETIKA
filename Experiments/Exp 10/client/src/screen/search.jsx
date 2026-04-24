import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/style.css";

import cultureImage from "../assets/Images/1st.jpg";
import businessImage from "../assets/Images/business.jpg";
import educationImage from "../assets/Images/education.jpg";
import healthImage from "../assets/Images/health.jpg";
import comedyImage from "../assets/Images/comedy.webp";
import newsImage from "../assets/Images/news.jpeg";
import scienceImage from "../assets/Images/science.jpg";
import historyImage from "../assets/Images/history.jpg";
import religionImage from "../assets/Images/religion.jpg";
import developmentImage from "../assets/Images/development.jpeg";
import sportsImage from "../assets/Images/sports.png";
import crimeImage from "../assets/Images/crime.jpg";
import { toast } from "react-toastify";

const categories = [
  { title: "Culture", color: "#FF5733", image: cultureImage },
  { title: "Music", color: "#C5AFAE", image: businessImage },
  { title: "Education", color: "#A0C1D1", image: educationImage },
  { title: "Health", color: "#60D394", image: healthImage },
  { title: "Comedy", color: "#FF6B6B", image: comedyImage },
  { title: "News", color: "#C78942", image: newsImage },
  { title: "Science", color: "#6EC6CA", image: scienceImage },
  { title: "History", color: "#D57A98", image: historyImage },
  { title: "Religion", color: "#C4C4C4", image: religionImage },
  { title: "Development", color: "#6AD4E0", image: developmentImage },
  { title: "Sports", color: "#73BF55", image: sportsImage },
  { title: "Crime", color: "#9C73E3", image: crimeImage },
];

const PodTubeSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [podcasts, setPodcasts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await axios.get("/api/v1/get-podcasts");
        setPodcasts(res.data.data);
      } catch (error) {
        // console.error("Error fetching podcasts:", error);
        toast.error("Error fetching podcasts");
      }
    };

    fetchPodcasts();
  }, []);

  const handleCategoryClick = (categoryTitle) => {
    const categoryData = podcasts.filter(
      (podcast) => podcast.category.categoryName === categoryTitle
    );

    if (categoryData.length > 0) {
      navigate(`/showpodcasts/${categoryTitle}`, { state: { data: categoryData } });
    } else {
      // alert(`No data found for the ${categoryTitle} category.`);
      toast.error(`No data found for the ${categoryTitle} category.`);
    }
  };

  return (
    <div className="bg-gray-100 rounded-xl min-h-screen px-6 py-4">
      {/* <div className="flex justify-center w-full items-center mb-8">
        <div className="flex items-center lg:max-w-[30vw] w-full overflow-hidden relative">
          <input
            type="text"
            placeholder="Search Artist/Podcast"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-5 py-2 pl-10 border-2 rounded-l-full bg-transparent text-black placeholder-gray-400 outline-none"
          />
          <FiSearch className="absolute left-4 text-gray-400 text-lg" />
          <button
            onClick={() => console.log("Searching:", searchQuery)}
            className="bg-gray-300 text-black px-6 py-2 border-2 rounded-r-full hover:bg-gray-400 focus:outline-none"
          >
            Search
          </button>
        </div>
      </div> */}

      {/* Categories Section */}
      <div>
        <h2 className="text-gray-800 text-2xl font-bold mb-4">Browse All</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div
              key={category.title}
              onClick={() => handleCategoryClick(category.title)}
              className="relative bg-gray-700 hover:-translate-y-2 transition-all duration-200 overflow-hidden text-white rounded-lg p-4 h-[25vh] flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: category.color }}
            >
              <h3 className="text-lg font-bold absolute top-4 left-3">
                {category.title}
              </h3>
              <img
                src={category.image}
                alt={category.title}
                className="absolute -bottom-3 -right-2 w-20 h-22 transform rotate-12"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodTubeSearch;
