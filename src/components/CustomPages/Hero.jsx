import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-72 gap-20'>
      <h1 className='font-extrabold text-[50px] mt-12'>
        <span className='text-red-700'>Discover Your Next Adventure With AI :</span> In Just One Click
      </h1>
      <p className='text-xl text-gray-500 text-center'>
        Your personal trip planner and travel creator, creating custom itineraries tailored to your interests and budget
      </p>
      <Link to={"/createTrip"}>
        <Button 
          variant="outline" 
          className="rounded-2xl bg-cover bg-center" 
          
        >
          Get Started
        </Button>
      </Link>
      <div className='m-2 rounded-3xl overflow-hidden'>
        <img src='/preview2.png' className='rounded-lg'/>
      </div>
    </div>
  )
}

export default Hero
