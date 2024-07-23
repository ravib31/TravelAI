import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEYS;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "hotels": [\n    {\n      "hotelName": "The D Las Vegas",\n      "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",\n      "price": "$50-$100 per night",\n      "hotelImageUrl": "https://images.trvl-media.com/media/hotels/1000000/900000/899000/898500/898518/898518_140_b.jpg",\n      "geoCoordinates": "36.1699,-115.1424",\n      "rating": 4.0,\n      "description": "A budget-friendly hotel located in the heart of Fremont Street, offering a casino, restaurants, and live entertainment."\n    },\n    {\n      "hotelName": "Golden Nugget Las Vegas",\n      "hotelAddress": "129 E Fremont Street, Las Vegas, NV 89101",\n      "price": "$70-$150 per night",\n      "hotelImageUrl": "https://images.trvl-media.com/media/hotels/1000000/900000/899000/898500/898519/898519_140_b.jpg",\n      "geoCoordinates": "36.1695,-115.1405",\n      "rating": 4.5,\n      "description": "A historic hotel with a casino, multiple pools, restaurants, and a famous shark tank."\n    },\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "price": "$40-$80 per night",\n      "hotelImageUrl": "https://images.trvl-media.com/media/hotels/1000000/900000/899000/898000/898050/898050_140_b.jpg",\n      "geoCoordinates": "36.1176,-115.1729",\n      "rating": 3.5,\n      "description": "A family-friendly hotel with a circus theme, a casino, restaurants, and a midway with carnival rides."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "morning": {\n        "placeName": "Fremont Street Experience",\n        "placeDetails": "A pedestrian-friendly street with a canopy of lights and live entertainment.",\n        "placeImageUrl": "https://www.visitlasvegas.com/sites/default/files/styles/gallery_large/public/2018-10/Fremont-Street-Experience-Neon-Signs-Las-Vegas-Nevada.jpg?itok=D-t7s_qY",\n        "geoCoordinates": "36.1699,-115.1424",\n        "ticketPricing": "Free",\n        "rating": 4.5,\n        "timeTravel": "9:00 AM - 12:00 PM"\n      },\n      "afternoon": {\n        "placeName": "Mob Museum",\n        "placeDetails": "A museum dedicated to the history of organized crime in America.",\n        "placeImageUrl": "https://www.visitlasvegas.com/sites/default/files/styles/gallery_large/public/2018-10/Mob-Museum-Las-Vegas-Nevada.jpg?itok=692O2U-X",\n        "geoCoordinates": "36.1673,-115.1418",\n        "ticketPricing": "$25-$35",\n        "rating": 4.0,\n        "timeTravel": "1:00 PM - 4:00 PM"\n      },\n      "evening": {\n        "placeName": "Free Show on Fremont Street",\n        "placeDetails": "Enjoy free live entertainment on Fremont Street, including light shows and music performances.",\n        "placeImageUrl": "https://www.visitlasvegas.com/sites/default/files/styles/gallery_large/public/2018-10/Fremont-Street-Experience-Neon-Signs-Las-Vegas-Nevada.jpg?itok=D-t7s_qY",\n        "geoCoordinates": "36.1699,-115.1424",\n        "ticketPricing": "Free",\n        "rating": 4.5,\n        "timeTravel": "7:00 PM - 10:00 PM"\n      }\n    },\n    "day2": {\n      "morning": {\n        "placeName": "Hoover Dam",\n        "placeDetails": "A historic dam located just a short drive from Las Vegas, offering tours and stunning views.",\n        "placeImageUrl": "https://www.visitlasvegas.com/sites/default/files/styles/gallery_large/public/2018-10/Hoover-Dam-Las-Vegas-Nevada.jpg?itok=C7H7gQ4J",\n        "geoCoordinates": "36.0068,-114.9186",\n        "ticketPricing": "$30-$40",\n        "rating": 4.5,\n        "timeTravel": "9:00 AM - 12:00 PM"\n      },\n      "afternoon": {\n        "placeName": "Red Rock Canyon National Conservation Area",\n        "placeDetails": "A scenic area with hiking trails, rock formations, and stunning views.",\n        "placeImageUrl": "https://www.nps.gov/redr/learn/photosmultimedia/media/red_rock_canyon.jpg",\n        "geoCoordinates": "36.1979,-115.3974",\n        "ticketPricing": "$15 per vehicle",\n        "rating": 4.0,\n        "timeTravel": "1:00 PM - 4:00 PM"\n      },\n      "evening": {\n        "placeName": "Free Show on the Strip",\n        "placeDetails": "Enjoy a free show on the Las Vegas Strip, such as the Bellagio Fountains or the Volcano at the Mirage.",\n        "placeImageUrl": "https://www.visitlasvegas.com/sites/default/files/styles/gallery_large/public/2018-10/Bellagio-Fountains-Las-Vegas-Nevada.jpg?itok=c5eH257H",\n        "geoCoordinates": "36.1176,-115.1731",\n        "ticketPricing": "Free",\n        "rating": 4.5,\n        "timeTravel": "7:00 PM - 10:00 PM"\n      }\n    },\n    "day3": {\n      "morning": {\n        "placeName": "The Neon Museum",\n        "placeDetails": "A museum showcasing vintage neon signs from Las Vegas\'s past.",\n        "placeImageUrl": "https://www.visitlasvegas.com/sites/default/files/styles/gallery_large/public/2018-10/Neon-Museum-Las-Vegas-Nevada.jpg?itok=o_k_a57j",\n        "geoCoordinates": "36.1717,-115.1336",\n        "ticketPricing": "$20-$30",\n        "rating": 4.0,\n        "timeTravel": "9:00 AM - 12:00 PM"\n      },\n      "afternoon": {\n        "placeName": "Las Vegas Natural History Museum",\n        "placeDetails": "A museum showcasing the natural history of the Nevada region.",\n        "placeImageUrl": "https://images.trvl-media.com/media/hotels/1000000/900000/899000/898000/898014/898014_140_b.jpg",\n        "geoCoordinates": "36.1712,-115.1408",\n        "ticketPricing": "$15-$25",\n        "rating": 3.5,\n        "timeTravel": "1:00 PM - 4:00 PM"\n      },\n      "evening": {\n        "placeName": "Free Show at a Casino",\n        "placeDetails": "Enjoy a free show at a casino, such as a magic show, a comedian, or a musical performance.",\n        "placeImageUrl": "https://www.visitlasvegas.com/sites/default/files/styles/gallery_large/public/2018-10/Caesars-Palace-Las-Vegas-Nevada.jpg?itok=7K6mU_pY",\n        "geoCoordinates": "36.1107,-115.1721",\n        "ticketPricing": "Free",\n        "rating": 4.5,\n        "timeTravel": "7:00 PM - 10:00 PM"\n      }\n    }\n  }\n}\n```\n\n**Notes:**\n\n* This itinerary is just a suggestion and can be customized based on your interests and preferences.\n* You can find cheaper food options by eating at fast food restaurants, buffets, or grocery stores.\n* You can also find free activities in Las Vegas, such as walking around the Strip, watching street performers, or visiting the Bellagio Conservatory & Botanical Garden.\n* Prices for hotels and attractions are approximate and can vary depending on the time of year and availability.\n* The hotel image URL provides a general image for the hotel, but you should check the actual hotel website for more accurate images.\n* The provided geo coordinates are approximate and should be used as a guide. You can use Google Maps to find the exact location of each attraction.\n* The ratings are based on user reviews and may vary depending on the source. \n* This itinerary prioritizes free or inexpensive activities, but you can adjust it to include more expensive attractions if you have a larger budget.\n',
          },
        ],
      },
    ],
  });

 
