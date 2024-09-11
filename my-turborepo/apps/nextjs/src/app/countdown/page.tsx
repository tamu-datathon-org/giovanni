'use client'

import { Button } from '@vanni/ui/button';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { AiOutlineClose } from "react-icons/ai";
import "../_components/customCss.scss";


const useCountdown = (targetDate: any) => {
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, [targetDate]);

  return timeLeft;
};

const SchedulePage: React.FC = () => {
  const targetDate = new Date('2024-11-09T10:00:00');
  const timeLeft = useCountdown(targetDate);
  
  return (
    <div style={{
      backgroundImage: 'url(/images/Wallpaper_Blur.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily:'myfont',
      minHeight:'100vh'
    }}>
      <div className="container mx-auto px-4 py-8">        
        <div className="mb-8 flex justify-center">
          <div style={{
            width: `1062px`,
            height: `628px`,
            backgroundImage: 'url(/images/bear_with_blank_background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            position:'absolute',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            top:'70px',
            padding: '150px',
          }} className='shadow-lg'>
    <h2 className="font-bold text-black text-center mb-12" style={{ fontSize: '4rem' }}>Countdown to Datathon!</h2>

            <div className="flex justify-center space-x-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                   <div className="font-bold text-black" style={{ fontSize: '3.5rem' }}>{value}</div>
          <div className="uppercase text-black" style={{ fontSize: '2rem' }}>{unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SchedulePage;