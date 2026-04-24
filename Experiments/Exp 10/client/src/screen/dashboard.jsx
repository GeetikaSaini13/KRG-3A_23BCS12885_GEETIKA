// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import PodCards from "./podCards";
// import { useState } from "react";
// import axios from "axios";

// function Dashboard() {
//   const [podcasts, setPodcasts] = useState();
//   const cardData = [
//     { title: "Most Popular", link: "mostpopular" },
//     { title: "Comedy", link: "comedy" },
//     { title: "News", link: "news" },
//     { title: "Culture", link: "culture" },
//     { title: "Business", link: "business" },
//     { title: "Education", link: "education" },
//     { title: "Health", link: "health" },
//     { title: "Science", link: "science" },
//     { title: "History", link: "history" },
//     { title: "Religion", link: "religion" },
//     { title: "Development", link: "development" },
//     { title: "Sports", link: "sports" },
//     { title: "Crime", link: "crime" },
//   ];

//   useEffect(() => {
//     const fetch = async () => {
//       const res = await axios.get("http://localhost:5003/api/v1/get-podcasts");
//       setPodcasts(res.data.data);
//     };
//   });

//   return (
//     <div>
//       <div className="flex flex-col gap-5">
//         {cardData.map((card, index) => (
//           <div key={index} className="bg-gray-100  rounded-xl p-3">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl text-gray-900 font-bold">{card.title}</h2>
//               <Link
//                 to={`/showpodcasts/${card.link}`}
//                 className="text-violet-500"
//               >
//                 Show All
//               </Link>
//             </div>
//             <div className="flex justify-between items-center w-full">
//               <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-3 gap-10">
//                 {podcasts &&
//                   podcasts.map((podcast, i) => {
//                     return <PodCards items={podcast} />;
//                   })}
//               </div>
//             </div>
//             {/* <div className="flex justify-between items-center w-full">
//               <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-3 gap-10">
//                 <PodCards />
//                 <PodCards />
//                 <PodCards />
//                 <PodCards />
//                 <PodCards />
//               </div>
//             </div>  */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PodCards from "./podCards";
import axios from "axios";

function Dashboard() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  const groupPodcastsByCategory = (podcasts) => {
    return podcasts.reduce((acc, podcast) => {
      const category = podcast.category.categoryName;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(podcast);
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await axios.get("/api/v1/get-podcasts");
        setPodcasts(res.data.data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const categorizedPodcasts = groupPodcastsByCategory(podcasts);

  return (
    <div>
      <div className="flex flex-col gap-5">
        {Object.keys(categorizedPodcasts).map((category, index) => (
          <div key={index} className="bg-gray-100 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-gray-900 font-bold">{category}</h2>
              <Link to={`/showpodcasts/${category}`} className="text-violet-500">
                Show All
              </Link>
            </div>

            {loading ? (
              <div>Loading podcasts...</div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-3 gap-10">
                  {categorizedPodcasts[category].length > 0 ? (
                    categorizedPodcasts[category].map((podcast, i) => (
                      <PodCards key={i} items={podcast} />
                    ))
                  ) : (
                    <div>No podcasts available</div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
