import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/Service/GlobalApi";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PlaceCard = ({ place }) => {
  const [photoUrl,setPhotoUrl] = useState();
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
    };
    const res = await GetPlaceDetails(data).then((resp) => {
      // console.log(resp.data.places[0].photos[3].name);
      const photo_url = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      // console.log(photo_url)
      setPhotoUrl(photo_url);
    });
  };

  return (
    <Link to={"https://www.google.com/maps/search/?api=1&query="+place?.placeName +" " + place?.placeDetails} target="_blank">
    <div className="mt-5 p-3 border rounded-xl flex gap-5 hover:scale-110 transition-all  hover:shadow-md cursor-pointer">
      <img src={photoUrl?photoUrl:"/background.jpg"} className="w-[130px] h-[130px] rounded-xl object-cover" />
      <div>
        <h2 className="font-bold text-lg">{place?.placeName}</h2>
        <p className="text-sm text-gray-400"> {place?.placeDetails}</p>
        <Button variant="outline" size="icon">
          <FaLocationDot className="h-4 w-4" />
        </Button>
      </div>
    </div>
    </Link>
  );
};

export default PlaceCard;
