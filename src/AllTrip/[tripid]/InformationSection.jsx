import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/Service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";



const InformationSection = ({ trip }) => {
  const [photoUrl,setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const res = await GetPlaceDetails(data).then((resp) => {
      // console.log(resp.data.places[0].photos[3].name);
      const photo_url = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      // console.log(photo_url)
      setPhotoUrl(photo_url);
    });
  };
  return (
    <div>
      <img
        src={photoUrl?photoUrl:"/background.jpg"}
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className=" flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-2">
            <h2 className="p-1  bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅{trip?.userSelection?.NoOfDays} Days
            </h2>
            <h2 className="p-1  bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰{trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1  bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🧑‍🤝‍🧑 No of Travelers : {trip?.userSelection?.people}{" "}
            </h2>
          </div>
        </div>
        <Button variant="outline" size="icon">
          <IoIosSend className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default InformationSection;
