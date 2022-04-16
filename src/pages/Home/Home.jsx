import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectHome, getHomeAsync } from "../../features/home/homeSlice";

function Home() {
  const dispatch = useDispatch();
  const homeState = useSelector(selectHome);

  useEffect(() => {
    dispatch(getHomeAsync());
    console.log(123);
    console.log(homeState);
  }, []);
  if (homeState.isLoading) return <h1>Loading</h1>;
  return <div>{console.log(homeState)}home</div>;
}

export default Home;
