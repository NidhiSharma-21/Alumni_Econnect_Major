import React from 'react'
import connect from '../assets/connect-removebg-preview.png'
import MeetOurTeam from '../components/MeetOurTeam.jsx';
import ContactDetail from '../components/ContactDetail.jsx';


const AboutUs = () => {
  return (
    <>
      <section className='section1 pt-10 mt-10'>
        <div className='flex justify-center'>
          <div className=' block items-center w-[100%] justify-center  px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6'>
            <h6 className='mt-6 text-2xl font-bold text-[#2d545e] sm:text-4xl md:text-5xl'>About Us</h6>
            <p className='mt-4 text-lg tracking-wide leading-relaxed text-gray-400'> Our mission is to create a dynamic community where alumni can stay engaged, network, and give back to the institution that shaped their academic and professional journeys. Through a comprehensive web and mobile platform, we offer alumni the ability to register, share their success stories, explore job opportunities, connect with peers, and contribute to the growth of the college. By facilitating lifelong relationships, professional development, and philanthropy, we aim to build a vibrant and supportive alumni community for years to come.</p>
          </div>
          <div className='relative block w-[100%]  h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6'>
            <img className='mt-10 w-[100%] h-[100%]' src="https://png.pngtree.com/png-vector/20240724/ourmid/pngtree-animation-about-us-images-png-image_12801180.png" alt="" />
          </div>
        </div>
        <div className='flex justify-center mt-5'>
          <div className=' w-[100%] pl-8'>
            <img className='w-[80%] h-[80%] ' src={connect} alt="" />
          </div>
          <div className=' block items-center w-[100%] justify-center  py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6'>
            <h6 className='mt-6 text-2xl font-bold text-[#2d545e] sm:text-4xl md:text-5xl'>Our Mission:Buil connection between Alumni</h6>
            <p className='mt-4 text-lg tracking-wide leading-relaxed text-gray-400'>Our mission is to create a dynamic community where alumni can stay engaged, network, and give back to the institution that shaped their academic and professional journeys.</p>
          </div>

        </div>
      </section>
      <section className="section2 py-8 mt-4">

        <div  >
          <MeetOurTeam />
        </div>

      </section>
      <section>
        <div>

        </div>
      </section>

    </>
  );
}

export default AboutUs;
