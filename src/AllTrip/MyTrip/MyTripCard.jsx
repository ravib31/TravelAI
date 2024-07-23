import { GetPlaceDetails, PHOTO_REF_URL } from '@/Service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MyTripCard = ({ trip }) => {
    console.log(trip)
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
    <Link to={"/allTrip/"+trip?.id}>
    <div className="hover:scale-105 transition-all cursor-pointer">
      <img src={photoUrl?photoUrl:"/background.jpg"} alt="Trip Background" className='h-[340px] w-[370px] object-cover rounded-xl'/>
      {/* <h2>{trip?.tripName || "Trip Name"}</h2> */}
      <div>
        <h2>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label || "Location not available"}</h2>
            <h2 className='text-gray-500 text-sm'>{trip?.userSelection?.NoOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
        </h2>
      </div>
    </div>
    </Link>
  );
};

export default MyTripCard;
