import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { getData, fetchWeather, recentAdd } from "../../../Features/ApidataSlice";
import "./Header.css";
const Header = () => {

  const [dialog, setDialog] = useState(false);
  const [search,setSearch] = useState(false);
  const data = useSelector(getData);
  const dispatch = useAppDispatch();
  const [inputValue, setinputValue] = useState("");
  const name = "udupi";
  useEffect(() => {
    dispatch(fetchWeather(name));
    // submitHandler()
  }, []);
  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(fetchWeather(inputValue));
  };
  // console.log(data);
  // function openSearch() {
  //   document.getElementById("myOverlay").style.display = "block";
  // }
  
  // function closeSearch() {
  //   document.getElementById("myOverlay").style.display = "none";
  // }
  return (
    <div id="myOverlay">
      <div className="header">
        <img className="weather-img" src="/images/logo_web.png" alt="pic" />
        {/* <input  type="text" placeholder='Search City' /> */}
        <div className="search-wrapper">
          <form onSubmit={submitHandler}>
            <input
              // value={location}
              // onChange={(event) => setLocation(event.target.value)}
              onKeyPress={ () =>{dispatch(fetchWeather(inputValue))
                dispatch(recentAdd(data))}}

              value={inputValue}
              onChange={(e) => setinputValue(e.target.value)}
              className="search-input"
              placeholder="Search City"
              type="text"
              name="search"
            />
          </form>
          <img   onClick={() => {
              dispatch(fetchWeather(inputValue));
              dispatch(recentAdd(data));
            }} src="images/search.png" />
        </div>
      </div>
      <div className="header-mobile">
        <img
          className="icon-menu-white"
          src="images/icon_menu_white.png"
          alt=""
          onClick={()=>{
           setDialog(true)
          }}
        />
        <img className="weather-img" src="/images/logo_web.png" alt="pic" />
        <img   onClick={()=>{
           setSearch(true)}} className="icon-search-white" src="images/search.png" />
      </div>
      {search ? (<div className="search-container">
        {/* <img className="icon-back-black " src="images/icon_back_black.png" alt="pic" /> */}
        <div className="search-wrapper-mobile">
          <form onSubmit={submitHandler}>
          <img className="icon-back-black " onClick={()=>{
           setSearch(false)
          }} src="images/icon_back_black.png" alt="pic" />
            <input
              // value={location}
              // onChange={(event) => setLocation(event.target.value)}
              onKeyPress={ () =>{dispatch(fetchWeather(inputValue))
                dispatch(recentAdd(data))
                setSearch(false)}}

              value={inputValue}
              onChange={(e) => setinputValue(e.target.value)}
              className="search-input-mobile"
              placeholder="Search City"
              type="text"
              name="search"
            />
          </form>
       
        </div>





      </div>):""}
      {dialog ?(<div className="burger-container">
      <NavLink to={"/"}> <p  onClick={()=>{
           setDialog(false)
          }} className="navlinksmobile">Home</p></NavLink> 
           <NavLink to={"/fav"}> <p  onClick={()=>{
           setDialog(false)
          }}className="navlinksmobile">Favuorite</p></NavLink> 
           <NavLink to={"/recent"}> <p  onClick={()=>{
           setDialog(false)
          }}className="navlinksmobile">Recent</p></NavLink> 
      
      
      </div>) : ""}
    </div>
  );
};

export default Header;
