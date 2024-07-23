import { db } from "@/Service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InformationSection from "./InformationSection";
import Hotel from "../Hotel/Hotel";
import DailyVisit from "./DailyVisit";
import Footer from "./Footer";

const AllTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    if (tripId) {
      tripData();
    }
  }, [tripId]);

  const tripData = async () => {
    try {
      const docRef = doc(db, "AItrips", tripId);
      const docSnap = await getDoc(docRef);
      // console.log("Document Snapshot:", docSnap);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No Document Found");
        toast("No Document Found");
      }
    } catch (error) {
      console.error("Error getting document:", error);
      toast("Error getting document");
    }
  };

  return <div className="p-10 md:px-20 lg:px-44 xl:px-56">
    <InformationSection trip={trip}/>
    <Hotel trip={trip}/>
    <DailyVisit trip={trip}/>
    <Footer trip={trip}/>
  </div>;
};

export default AllTrip;
