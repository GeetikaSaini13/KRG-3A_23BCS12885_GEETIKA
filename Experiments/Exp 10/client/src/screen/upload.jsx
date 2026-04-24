import React, { useState } from "react";
import axios from "axios";

function Upload({ openUpload, showUploadModal }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [imgae, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    category: "",
  });

  const changeInput = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudio(file);
    }
  };

  const submitPodcast = async () => {
    if (
      !inputValues.title ||
      !inputValues.description ||
      !inputValues.category ||
      !thumbnail ||
      !audio
    ) {
      console.log("All fields are required");
      return;
    }
    if (inputValues.category === "select") {
      console.log("Please select a valid category");
      return;
    }

    const data = new FormData();
    data.append("title", inputValues.title);
    data.append("description", inputValues.description);
    data.append("category", inputValues.category);
    data.append("frontImage", thumbnail);
    data.append("audioFile", audio);

    try {
      const res = await axios.post(
        "http://localhost:5003/api/v1/add-podcast",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(res.data.message);
      openUpload();
    } catch (err) {
      console.error(err.response?.data || "An unknown error occurred");
    } finally {
      setInputValues({ title: "", description: "", category: "" });
      setThumbnail(null);
      setAudio(null);
      document.getElementById("thumbnail-upload").value = "";
      document.getElementById("audioFile").value = "";
    }
  };

  return (
    <>
      {showUploadModal && (
        <div className="">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between mb-4 items-center w-full">
                <h2 className="text-2xl font-bold text-center">
                  Upload Podcast
                </h2>
                <button onClick={openUpload} className=" text-black">
                  X
                </button>
              </div>

              <div className="mb-4 text-center">
                <label
                  htmlFor="thumbnail-upload"
                  className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4"
                >
                  {thumbnail ? (
                    <img
                      src={imgae}
                      alt="Thumbnail"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-500">Upload Thumbnail</span>
                  )}
                </label>
                <input
                  type="file"
                  id="thumbnail-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnailUpload}
                />
                {/* <label htmlFor="file">Drag and drop or click to upload</label> */}
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={inputValues.title}
                  onChange={changeInput}
                  placeholder="Enter podcast name"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <textarea
                  rows="3"
                  id="description"
                  name="description"
                  value={inputValues.description}
                  onChange={changeInput}
                  placeholder="Enter podcast description"
                  className="w-full border rounded px-3 py-2"
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="audioFile">Select Audio</label>
                <input
                  type="file"
                  id="audioFile"
                  name="audioFile"
                  onChange={handleAudioUpload}
                  accept="audio/*"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Select Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={inputValues.category}
                  onChange={changeInput}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="select">Select Category</option>
                  <option value="Culture">Culture</option>
                  <option value="Music">Music</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Comedy">Comedy</option>
                  <option value="News">News</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Religion">Religion</option>
                  <option value="Development">Development</option>
                  <option value="Sports">Sports</option>
                  <option value="Crime">Crime</option>
                </select>
              </div>

              <div className="text-center">
                <button
                  onClick={submitPodcast}
                  className="hover:bg-gray-500 text-white w-1/2 px-4 py-2 rounded bg-gray-600"
                >
                  Create Podcast
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Upload;
