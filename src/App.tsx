import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Favourite from "./components/Favourite/Favourite";
// import "react-tabs/style/react-tabs.css";
import Header from "./components/header/Header/Header";
import HomeTab from "./components/HomeTab/HomeTab";
import RecentSearch from "./components/RecentSearch/RecentSearch";
import TabHeader from "./components/tabHeader/TabHeader";
import Home from "./Home";
import { ClipLoader } from "react-spinners";

function App() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  console.log(loading);
  return (
    <div className="homeContainer">
      {loading ? (
        <div className="loader-div">
          <div style={{color:"white"}}>loading</div>
          <ClipLoader color="white" />
        </div>
      ) : (
        <Home />
      )}
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fav" element={<Favourite />} />{" "}
        <Route path="/recent" element={<RecentSearch />} />
      </Routes> */}
    </div>
  );
}

export default App;
