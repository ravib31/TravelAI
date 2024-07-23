import React from "react";

const Shimmer = () => {
  return (
    <div className=" m-10 p-8 w-[1100px]">
      <div className="grid grid-cols-3 md:grid-cols-3 gap-2 rounded-lg">
        <div className="bg-gray-400  shadow-md p-6 h-[280px] w-full animate-pulse rounded-lg border "></div>
        <div className="bg-gray-400  shadow-md p-6 h-[280px] w-full animate-pulse rounded-lg border "></div>
        <div className="bg-gray-400  shadow-md p-6 h-[280px] w-full animate-pulse rounded-lg border "></div>
        <div className="bg-gray-400  shadow-md p-6 h-h-[280px] w-full animate-pulse rounded-lg border "></div>
        <div className="bg-gray-400 rounded-lg shadow-md p-6 h-[280px] w-full animate-pulse  border "></div>
        <div className="bg-gray-400 rounded-lg shadow-md p-6 h-[280px] w-full animate-pulse border "></div>
      </div>
    </div>
  );
};

export default Shimmer;
