import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
  clearAllrecent,
  fetchWeather,
  getData,
  getFav,
  getLiked,
  getRecent,
  recentAdd,
} from "../../Features/ApidataSlice";
import RecentFavBox from "../Recent-fav-box/RecentFavBox";
import filledheart from "../../images/icon_favourite_Active.png";
import unfilledheart from "../../images/icon_favourite.png";
import "./RecentSearch.css";
import { NavLink } from "react-router-dom";


const RecentSearch = () => {
  const [dialog, setDialog] = useState(false);
  const Recentdata = useSelector(getRecent);
  const likedData = useSelector(getLiked);
  const [unfilled, setUnfilled] = useState(true);
  const dispatch = useAppDispatch();
  // console.log(Recentdata);
  const [search,setSearch] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const data = useSelector(getData);
  const Favdata = useSelector(getFav);
  const likeddata = useSelector(getLiked);
  // console.log(Favdata.length);
  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(fetchWeather(inputValue));
                dispatch(recentAdd(data))
                setSearch(false)
  };

  return (
    <div>
        <div className="mobile-fav">
        <div className="fav-left">
          <div className="back-btn"> <NavLink to={"/"}><img className="icon-back-black "
          src="images/icon_back_black.png" alt="pic" /></NavLink></div>
          <div className="fav-text-mobile">Recent</div>
        </div>
        <div className="fav-right"><div className="search-icn"><img onClick={()=>{
           setSearch(true)}} className="icon-search-white" src="images/kindpng_1850591.png" /></div></div>
      </div>
      {search ? (<div className="search-container">
        
        <div className="search-wrapper-mobile">
          <form onSubmit={submitHandler}>
          <img className="icon-back-black " onClick={()=>{
           setSearch(false)
          }} src="images/icon_back_black.png" alt="pic" />
            <input
              // value={location}
              // onChange={(event) => setLocation(event.target.value)}
            

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
      
      {dialog ? (
        <div>
          <div className="modalContainer">
            <div className="overlay">
              <div className="modalContent">
                <div className="infoModal">
                  Are you sure want to remove all the favourites?
                </div>
                <div className="modalButtons">
                  <form action="" className="modalForm">
                    <button className="btnNo" onClick={() => setDialog(false)}>
                      No
                    </button>
                    <button
                      className="btnNo"
                      type="button"
                      onClick={() => {
                        // localStorage.removeItem("search");

                        dispatch(clearAllrecent());

                        setDialog(false);
                      }}
                    >
                      Yes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {Recentdata.length > 1 ? (
        <div>
         <div className="top">
        <p>You recently serached for</p>
        <p
          onClick={() => {
            setDialog(true);
          }}
        >
          Clear All
        </p>
      </div>
          {Recentdata.map((data: any) => {
            return (
              <div>
                
                <div className="rectangle-box-mobile">
                  <div className="rect-mob-r">
                    <p className="city">{data.name}</p>
                    <div className="mid-mobile">
                      <img
                        className="fav-sun-pic"
                        src={require(`../../Assets/weathericons/${data.weather[0].icon}@2x.png`)} 
                        alt="pic"
                      />
                      <span className="temp-deg-mobile">
                      {(
                        (data && data.main && data.main.temp - 32) *
                        (5 / 9)
                      ).toFixed(0)}
                        <sup>o</sup>C
                      </span>
                      <span className="city-mobile">{data.weather ? data.weather[0].description : " "}</span>
                    </div>
                  </div>
                  <img
                    className="favorite-heart-button-mobile"
                    src={
                      likedData.includes(data.id) ? filledheart : unfilledheart
                    }
                    alt="pic"
                  />
                </div>
                <div className="rectangle-box">
                  <span className="city">{data.name}</span>
                  <div className="mid">
                    <img className="fav-sun-pic"  src={require(`../../Assets/weathericons/${data.weather[0].icon}@2x.png`)}  alt="pic" />
                    <span className="temp-deg">
                      {(
                        (data && data.main && data.main.temp - 32) *
                        (5 / 9)
                      ).toFixed(0)}
                      <sup>o</sup>C
                    </span>
                    <span className="city">
                      {data.weather ? data.weather[0].description : " "}
                    </span>
                  </div>
                  <img
                    className="favorite-heart-button"
                    src={
                      likedData.includes(data.id) ? filledheart : unfilledheart
                    }
                    alt="pic"
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          
        <div>
          {" "}
          <div className="nothing">
            <img src="images/icon_nothing.png" alt="" />
            <p className="no-favourites-added">No Recent Search</p>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default RecentSearch;
