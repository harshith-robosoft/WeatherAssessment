import React, { useEffect } from "react";
import Favourite from "./components/Favourite/Favourite";
import Header from "./components/header/Header/Header";
import HomeTab from "./components/HomeTab/HomeTab";
import TabHeader from "./components/tabHeader/TabHeader";
import RecentSearch from "./components/RecentSearch/RecentSearch";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, getData } from "./Features/ApidataSlice";
import { useAppDispatch } from "./app/hooks";


const Home = () => {
  // const data = useSelector(getData);
  // const dispatch = useAppDispatch();

  // useEffect(()=>{
  //   dispatch(fetchWeather())
  // },[dispatch])

  // console.log(data);
  
  
  return (
    <div>
      <Header />
      <TabHeader />
    </div>
  );
};

export default Home;
