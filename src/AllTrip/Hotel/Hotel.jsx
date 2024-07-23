import React from "react";
import { Link } from "react-router-dom";
import HotelCard from "./HotelCard";

const Hotel = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-6 ">
        {trip?.tripData?.hotels?.map((hotel, index) => (
           <HotelCard key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Hotel;
