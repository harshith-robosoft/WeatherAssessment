import React, { useEffect, useState } from "react";
import "./HomeTab.css";
import Switch from "react-switch";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
  addLiked,
  favAdd,
  favRemove,
  getLiked,
  recentAdd,
  removeOneliked,
} from "../../Features/ApidataSlice";
import { getData, fetchWeather } from "../../Features/ApidataSlice";
import { mainModule } from "process";
import filledheart from "../../images/icon_favourite_Active.png";
import unfilledheart from "../../images/icon_favourite.png";
const HomeTab = () => {
  const [unfilled, setUnfilled] = useState(true);
  const [add, setadd] = useState("Add To Favourite");
  const [checked, setChecked] = useState(false);
  const [favHeart, setFavHeart] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  const dispatch = useAppDispatch();

  const previousData = JSON.parse(localStorage.getItem("fav") || "[]");
  const data = useSelector(getData);
  const likedData = useSelector(getLiked);

  const handleHeart = () => {
    if (unfilled === true) {
      setUnfilled(!unfilled);
      setadd("Added To Favourite");
      dispatch(favAdd(data));
      dispatch(addLiked(data.id));
    } else {
      setUnfilled(!unfilled);
      setadd("Add To Favourite")
      dispatch(favRemove(data));
      dispatch(removeOneliked(data.id));
    }
  };
  const heartRemove = () => {
    // setUnfilled(true);
    //   setadd("Add To Favourite");
  };
  const handleheartfilled = () => {
    if (likedData.includes(data.id)) {
      setUnfilled(false);
      setadd("Added To Favourite");
    } else {
      setUnfilled(true);
      setadd("Add To Favourite");
    }
  };

  useEffect(() => {
    handleheartfilled();
  }, []);

  // const addFav = () => {
  //   const arr: any[] = [];
  //   previousData.map((user: any, i: number) => {
  //     // console.log("previousData.user.location.woeid", user.location.woeid);
  //     if (user.location.woeid === data.location.woeid) {
  //       arr.push("exists");
  //     }
  //   });

  //   if (arr.includes("exists")) {
  //     alert("already exists");
  //   } else {
  //     if (data !== "") {
  //       previousData.push(data);
  //       localStorage.setItem("fav", JSON.stringify(previousData));
  //       setFavHeart(!favHeart);
  //     } else {
  //       alert("empty");
  //     }
  //   }
  // };

  return (
    <>
      {data && data.weather && (
        <div>
          <div className="city-name">
            <span>{data.name}</span>
          </div>

          <div className="addFav">
            <img
              src={unfilled ? unfilledheart : filledheart}
              className="heartfav"
              alt="pic"
              onClick={() => {
                handleHeart();
              }}
            />
            <span
              className="fav-text"
              style={{ color: add === "Add To Favourite" ? "white" : "yellow" }}
            >
              {add}
            </span>
          </div>

          <div className="weather-pic">
            <img
              src={require(`../../Assets/weathericons/${
                data && data.weather && data.weather[0].icon
              }@2x.png`)}
              alt=""
            />
          </div>
          <div className="temp-box">
            <div className="temp">
              <div>
                {checked
                  ? data && data.main && data.main.temp.toFixed(0)
                  : (
                      (data && data.main && data.main.temp - 32) *
                      (5 / 9)
                    ).toFixed(0)}{" "}
              </div>
            </div>

            <div className="switchTempature ">
              <Switch
                borderRadius={4}
                onChange={handleChange}
                checked={checked}
                className="react-switch"
                offColor="transparent"
                onColor="transparent"
                uncheckedHandleIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 18,
                      color: "red",
                    }}
                  >
                    {"\u00B0"}C
                  </div>
                }
                uncheckedIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 18,
                      paddingRight: 2,
                      color: "white",
                      zIndex: "2",
                    }}
                  >
                    {"\u00B0"}F
                  </div>
                }
                checkedIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 18,
                      paddingRight: 2,
                      color: "white",
                    }}
                  >
                    {"\u00B0"}C
                  </div>
                }
                checkedHandleIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      color: "red",
                      fontSize: 18,
                    }}
                  >
                    {"\u00B0"}F
                  </div>
                }
              />
            </div>
          </div>
          <div className="temp-type">
            {data.weather ? data.weather[0].description : " "}
          </div>
          {/* {data&&data.weather[0]&&data.weather[0].description} */}
          <div className="footer-line"></div>
          <div className="footer-mobile-box">
            <div className="footer-mobile">
              <div className="min-max-box">
                <img src="images/icon_temperature_info.png" alt="" />
                <div className="min-max-box-r">
                  <p>Min-max</p>
                  <span>
                    {(
                      (data && data.main && data.main.temp_min - 32) *
                      (5 / 9)
                    ).toFixed(0)}
                    -
                    {(
                      (data && data.main && data.main.temp_max - 32) *
                      (5 / 9)
                    ).toFixed(0)}{" "}
                    <sup>o</sup>C
                    {/* {data && data.main && data.main.temp_min}-
                {data && data.main && data.main.temp_max} */}
                  </span>
                </div>
              </div>

              <div className="min-max-box">
                <img src="images/icon_precipitation_info.png" alt="" />
                <div className="min-max-box-r">
                  <p>Precipitation</p>
                  <span>0%</span>
                </div>
              </div>

              <div className="min-max-box">
                <img src="images/icon_humidity_info.png" alt="" />
                <div className="min-max-box-r">
                  <p>Humidity</p>
                  <span>{data && data.main && data.main.humidity}%</span>
                </div>
              </div>

              <div className="min-max-box">
                <img src="images/icon_wind_info.png" alt="" />
                <div className="min-max-box-r">
                  <p>Wind</p>
                  <span> {data && data.wind && data.wind.speed} mph</span>
                </div>
              </div>

              <div className="min-max-box">
                <img src="images/icon_visibility_info.png" alt="" />
                <div className="min-max-box-r">
                  <p>Visibility</p>
                  <span>{data.visibility} mph</span>
                </div>
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="min-max-box">
              <img src="images/icon_temperature_info.png" alt="" />
              <div className="min-max-box-r">
                <p>Min-max</p>
                <span>
                  {(
                    (data && data.main && data.main.temp_min - 32) *
                    (5 / 9)
                  ).toFixed(0)}
                  -
                  {(
                    (data && data.main && data.main.temp_max - 32) *
                    (5 / 9)
                  ).toFixed(0)}{" "}
                  <sup>o</sup>C
                </span>
              </div>
            </div>

            <div className="min-max-box">
              <img src="images/icon_precipitation_info.png" alt="" />
              <div className="min-max-box-r">
                <p>Precipitation</p>
                <span>0%</span>
              </div>
            </div>

            <div className="min-max-box">
              <img src="images/icon_humidity_info.png" alt="" />
              <div className="min-max-box-r">
                <p>Humidity</p>
                <span>{data && data.main && data.main.humidity}%</span>
              </div>
            </div>

            <div className="min-max-box">
              <img src="images/icon_wind_info.png" alt="" />
              <div className="min-max-box-r">
                <p>Wind</p>
                <span> {data && data.wind && data.wind.speed} mph</span>
              </div>
            </div>

            <div className="min-max-box">
              <img src="images/icon_visibility_info.png" alt="" />
              <div className="min-max-box-r">
                <p>Visibility</p>
                <span>{data.visibility} mph</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeTab;
