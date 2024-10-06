import React from 'react'
import { Link } from 'react-router-dom';

const EventCart = ({image,heading,paragraph}) => {
  return (
    <div>
      <div className=''>
        <div>
            <img className='w-[100%] h-[50%] ' src={image} alt="" />
        </div>
        <div>
        <Link >
        <h6 className='text-3xl font-bold text-[#2d545e] my-8 md:hover:text-[#d27511]'>{heading} </h6>
        </Link>
            
            <p className='text-wrap text-lg leading-relaxed text-gray-700'>{paragraph}</p>
        </div>
      </div>
    </div>
  )
}

export default EventCart
