import React from "react";
import LeftSidebar from "../common/LeftSidebar";
import Feed from "../common/Feed";
import RightSidebar from "../common/RightSidebar";

const Home = () => {
  return (
    <div className="w-full flex items-start gap-5 ">
      <div className="w-[20%] h-screen flex gap-5 border">
        <LeftSidebar />
      </div>
      <div className="w-[50%] h-screen flex gap-5">
        <Feed />
      </div>
      <div className="w-[30%] h-screen flex gap-5">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
