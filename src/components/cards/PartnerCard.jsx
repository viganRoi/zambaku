import React, { useState } from 'react'

const PartnerCard = ({ title, text }) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleClick = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className='w-full h-full relative border border-dark p-4 md:p-8 flex flex-col items-center justify-center bg-white'>
      <div
        className='w-full h-86 md:h-124 flex flex-col gap-4 relative'
        style={{
          backgroundImage: "url('/assets/images/brand/logoBck.png')",
          backgroundSize: '25%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <h1 className='valky text-xl md:text-4xl text-primary'>{title}</h1>
        <div className='h-full scroller-thin'>
          <p className={`axiforma-thin text-sm md:text-lg text-dark duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>{text}</p>
        </div>
      </div>
      <div className='w-full mt-4 flex justify-end'>
        <button
          onClick={handleClick}
          className={`h-10 md:h-12 w-10 md:w-12 border border-dark rounded-full duration-300 ${
            isVisible ? 'bg-primary text-secondary' : 'bg-white hover:bg-primary hover:text-secondary'
          }`}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default PartnerCard