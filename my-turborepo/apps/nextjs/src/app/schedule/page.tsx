'use client'
import React from 'react';

const events = [
  { id: 1, name: 'Opening Ceremony', date: new Date('2024-11-09T09:00:00') },
  { id: 5, name: 'Closing Ceremony', date: new Date('2024-11-09T17:00:00') },
];

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

const SchedulePage = () => {
  const targetDate = new Date('2024-11-09T00:00:00');
  const timeLeft = useCountdown(targetDate);

  return (
    <div style={{
      backgroundImage: 'url(/images/Wallpaper_Blur.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily:'windows95Font',
      minHeight:'100vh'
    }}>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Datathon Schedule</h1>
      
      <div className="mb-8 flex justify-center">
          <div style={{
            width: `600px`,
            height: `350px`,
            backgroundImage: 'url(/images/bear_with_blank_background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '80px',
          }}>
            <h2 className="text-5xl font-bold text-black text-center mb-8">Countdown to Big D!</h2>

            <div className="flex justify-center space-x-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="text-4xl font-bold text-black">{value}</div>
                  <div className="text-xl uppercase text-black">{unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>


      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Event List</h2>
        {events.map((event) => {
          const isPast = new Date() > event.date;
          return (
            <div
              key={event.id}
              className={`p-4 rounded-lg shadow ${
                isPast ? 'bg-gray-200 text-gray-500' : 'bg-white'
              }`}
            >
              <h3 className="text-lg font-semibold">{event.name}</h3>
              <p className="text-sm">
                {event.date.toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </p>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default SchedulePage;