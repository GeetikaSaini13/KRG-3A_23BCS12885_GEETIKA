import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PodCards from "./podCards";

function DisplayPod() {
  const { category } = useParams();
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryPodcasts = async () => {
      try {
        const res = await axios.get(
          `/api/v1/podcast-by-category/${category}`
        );
        setPodcasts(res.data.data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryPodcasts();
  }, [category]); 

  return (
    <div className="text-white">
      <h1 className="text-2xl text-gray-900 font-bold">{category} Podcasts</h1>

      {/* Handle loading state */}
      {loading ? (
        <div>Loading podcasts...</div>
      ) : (
        <div className="flex justify-between items-center w-full">
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-3 gap-10">
            {podcasts.length > 0 ? (
              podcasts.map((podcast, i) => <PodCards key={i} items={podcast} />)
            ) : (
              <div>No podcasts available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayPod;
