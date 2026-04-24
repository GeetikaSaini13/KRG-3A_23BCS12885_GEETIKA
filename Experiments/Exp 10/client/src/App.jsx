import React, { Profiler, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./screen/dashboard";
import HomeLayout from "./layout/homeLayout";
import Search from "./screen/search";
import Favourite from "./screen/fav";
import Upload from "./screen/upload";
import Profile from "./screen/profile";
import DisplayPod from "./screen/displayPod";
import PodDetails from "./screen/podDetails";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/api/v1/check-cookies", {
          withCredentials: true,
        });
        if (res.data.message === true) {
          dispatch(authActions.login());
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/podcast/:id" exact element={<PodDetails />} />
          <Route path="/showpodcasts/:category" exact element={<DisplayPod />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
