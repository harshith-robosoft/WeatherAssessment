import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import {
  favRemove,
  fetchWeather,
  getData,
  getFav,
  getLiked,
  recentAdd,
  removeAllFav,
  removeAllliked,
  removeOneliked,
} from "../../Features/ApidataSlice";
import RecentFavBox from "../Recent-fav-box/RecentFavBox";
import "./Favourite.css";
const Favourite = () => {
  // const recentSearchData = JSON.parse(localStorage.getItem("search") || "[]");
  const [fav, setfav] = useState(true);
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
  const onDelete = () => {};
  const dispatch = useAppDispatch();
  const showfav = () => {
    if (document.getElementsByClassName("rectangle-box").length <= 0) {
      setfav(false);
    }
  };

  // console.log(likeddata);
  useEffect(() => {
    showfav();
  }, []);
  return (
    <div>
      <div className="mobile-fav">
        <div className="fav-left">
          <div className="back-btn"> <NavLink to={"/"}><img className="icon-back-black "
          src="images/icon_back_black.png" alt="pic" /></NavLink></div>
          <div className="fav-text-mobile">Favourite</div>
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
              // onKeyPress={ () =>{
                
              //   setSearch(false)}}

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
      {fav ? (
        <div>
          <div className="top">
            <p>{Favdata.length} City added for favourite.</p>
            <p
              onClick={() => {
                dispatch(removeAllFav());
                dispatch(removeAllliked());
              }}
            >
              Clear All
            </p>
          </div>
          {Favdata.map((data: any) => {
            return (
              <div>
                <div className="rectangle-box-mobile">
                  <div className="rect-mob-r">
                    <span className="city">{data.name}</span>
                    <div className="mid-mobile">
                      <img
                        className="fav-sun-pic"
                        src={require(`../../Assets/weathericons/${data.weather[0].icon}@2x.png`)}
                        alt="pic"
                      />
                      <span className="temp-deg-mobile">
                        44
                        <sup>o</sup>C
                      </span>
                      <span className="city-mobile">
                        {data.weather ? data.weather[0].description : " "}
                      </span>
                    </div>
                  </div>
                  <img
                    className="favorite-heart-button-mobile"
                    src="images/icon_favourite_Active.png"
                    alt="pic"
                  />
                </div>

                <div className="rectangle-box">
                  <span className="city">{data.name}</span>
                  <div className="mid">
                    <img
                      className="fav-sun-pic"
                      src={require(`../../Assets/weathericons/${data.weather[0].icon}@2x.png`)}
                      alt="pic"
                    />
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
                    src="images/icon_favourite_Active.png"
                    alt="pic"
                    onClick={() => {
                      dispatch(favRemove({ id: data.id }));
                      dispatch(removeOneliked(data.id));
                      // dispatch(recentAdd(data));
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="nothing">
          <img src="images/icon_nothing.png" alt="" />
          <p className="no-favourites-added">No favourites added</p>
        </div>
      )}
      {/* <div className="rectangle-box-mobile">
        <div className="rect-mob-r">
        <span className="city">Name</span>
        <div className="mid-mobile">
                    <img className="mobile-pic" src="images/icon_rain_small.png" alt="pic" />
                    <span className="temp-deg-mobile">
                44
                      <sup>o</sup>C
                    </span>
                    <span className="city-mobile">
                     mloer
                    </span>
                  </div>
        </div>
        <img
                    className="favorite-heart-button-mobile"
                    src="images/icon_favourite_Active.png"
                    alt="pic"
                   
                  />
      </div> */}
    </div>
  );
};

export default Favourite;

