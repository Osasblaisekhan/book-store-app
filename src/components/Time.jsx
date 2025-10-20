import React, { useEffect, useState } from 'react'

const Time = () => {
    const [isTime, setIsTime] = useState('');
    const TimeSet = (time)=>{
        const timeProp = {
            year:'numeric',
            month:'long',
            day:'numeric',
            hour:'2-digit',
            minute:'2-digit',
            second:'2-digit'
        };

        return time.toLocaleString('en-US', timeProp);
    };

     useEffect(()=>{
        const id = setInterval(()=>{
            const d = new Date();
            setIsTime(TimeSet(d))
        }, 1000);
        // initialize immediately
        setIsTime(TimeSet(new Date()));
        return ()=> clearInterval(id);
    }, [])
  return (
    <div>
      <div>
        <h2 className='font-bold text-[20px]'>{isTime}</h2>
      </div>
    </div>
  )
}

export default Time;
