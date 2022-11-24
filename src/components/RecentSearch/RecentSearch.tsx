import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
  clearAllrecent,
  getLiked,
  getRecent,
} from "../../Features/ApidataSlice";
import RecentFavBox from "../Recent-fav-box/RecentFavBox";
import filledheart from "../../images/icon_favourite_Active.png";
import unfilledheart from "../../images/icon_favourite.png";
import "./RecentSearch.css";

const RecentSearch = () => {
  const [dialog, setDialog] = useState(false);
  const Recentdata = useSelector(getRecent);
  const likedData = useSelector(getLiked);
  const [unfilled, setUnfilled] = useState(true);
  const dispatch = useAppDispatch();
  console.log(Recentdata);

  return (
    <>
      
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
                      <span className="city-mobile">{data.weather ? data.weather[0].description : " "}</span>
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
                    <img src="images/icon_visibility_info.png" alt="pic" />
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
    </>
  );
};

export default RecentSearch;
