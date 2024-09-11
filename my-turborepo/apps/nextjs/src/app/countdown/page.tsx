'use client'

import React from 'react';
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
            width: '100%',
            maxWidth: '1062px',
            height: 'auto',
            aspectRatio: '1062 / 628',
            backgroundImage: 'url(/images/bear_with_blank_background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '7%',
          }} className='shadow-lg'>
            <h2 className="font-bold text-black text-center mb-12 text-4xl sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>Countdown to Datathon!</h2>
            <div>
                <h2 className="text-black text-center mb-12 text-xl sm:text-2xl md:text-3xl lg:text-4xl" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>November 9th, 2024</h2>
            </div>

            <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center px-2 sm:px-4">
                   <div className="font-bold text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)' }}>{value}</div>
                   <div className="uppercase text-black text-sm sm:text-base md:text-lg lg:text-xl " style={{ fontSize: 'clamp(0.8rem, 2vw, 2rem)' }}>{unit}</div>
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