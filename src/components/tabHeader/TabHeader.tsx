import React, { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "../../Home";
import Favourite from "../Favourite/Favourite";
import HomeTab from "../HomeTab/HomeTab";
import RecentSearch from "../RecentSearch/RecentSearch";
import "./tabHeader.css";

const TabHeader = () => {
  const date = new Date();
  const [value, onChange] = useState("");
  const [time, onChangeTime] = useState("");
  setInterval(function () {
    today();
  }, 1000);
  setInterval(function () {
    todayTime();
  }, 1000);
  const today = () => {
    onChange(
      `${date.toLocaleString("en-us", {
        weekday: "short",
      })} ${date.getDate()}, ${date.toLocaleString("en-us", {
        month: "short",
      })} ${date.getFullYear()} `
    );
  };
  const todayTime = () => {
    onChangeTime(
      ` ${date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        // second: "numeric",
        hour12: true,
      })}`
    );
  };
  return (
    <>
      <div className="tab">
        <div className="tab-l">        
         <NavLink to={"/"}><button className="tablinks">HOME</button></NavLink> 
         <NavLink to={"/fav"}><button className="tablinks">FAVOURITE</button></NavLink> 
         <NavLink to={"/recent"}><button className="tablinks">RECENT SEARCH</button></NavLink> 
        </div>
        <div className="tab-r">
          <div className="date">
            {value}&nbsp;&nbsp;{time}
          </div>
        </div>    
    </div>
      <Routes>
        <Route path="/" element={<HomeTab />} />
        <Route path="/fav" element={<Favourite />} />{" "}
        <Route path="/recent" element={<RecentSearch />} />
      </Routes>
    </>
  );
};

export default TabHeader;
