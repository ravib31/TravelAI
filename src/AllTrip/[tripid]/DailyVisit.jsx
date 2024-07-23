import React from 'react';
import PlaceCard from './PlaceCard';

const DailyVisit = ({ trip }) => {
  // Log the value and type of trip.tripData.itinerary
  // console.log("trip.tripData.itinerary:", trip?.tripData?.itinerary);
  
  // Ensure trip.tripData.itinerary is an object and convert it to an array of entries
  const itinerary = trip?.tripData?.itinerary ? Object.entries(trip.tripData.itinerary) : [];

  return (
    <div className='mt-5'>
      <h2 className='font-bold text-lg'>Places to Visit</h2>
      <div>
        {itinerary.map(([day, activities], index) => (
          <div key={index}>
            <h2 className='font-bold text-lg'> {day}</h2>
            <div className='grid md:grid-cols-2 gap-7 mt-2'>
              {Object.entries(activities).map(([timeOfDay, details], idx) => (
                  <div key={idx}>
                    <p className='font-medium text-sm text-orange-500'>⏰ {details.timeTravel}</p>
                  <PlaceCard place={details} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyVisit;
