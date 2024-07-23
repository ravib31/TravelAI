import { db } from "@/Service/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyTripCard from "./MyTripCard";
import Shimmer from "../ShimmerUi/Shimmer";

const MyTrip = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrip();
  }, []);

  const GetUserTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);

    if (!user) {
      navigate("/");
      return;
    }

   
    const q = query(
      collection(db, "AItrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
      setUserTrips((preTrip) => [...preTrip, { id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl text-center">MyTrips</h2>
      <div className="grid grid-cols-2 mt-10 md:grid-cols-3  gap-4">
        {userTrips.length>0?userTrips.map((trip) => (
          <MyTripCard key={trip.id} trip={trip} className="" />
        )):
        <Shimmer/>
        }
      </div>
    </div>
  );
};

export default MyTrip;
