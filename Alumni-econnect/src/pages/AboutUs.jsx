import React from 'react'
import aboutsvg from "../assets/aboutUs.png"
import about2 from "../assets/aboutUs2-.png"
import MeetOurTeam from '../components/AboutComponent.jsx/MeetOurTeam'
import AlumniEconnectFooter from '../components/FooterComponent/FooterComponent'

const AboutUs = () => {
    return (
        <>
        <section className="py-12 mt-6">
            <div className='flex items-center p-8' >
                <div className='w-[100%] p-8 m-4'>
                    <h6 className="mt-6 text-3xl font-bold text-[#2d545e] sm:text-4xl md:text-5xl">
                        About Us</h6>
                    <p className="mt-4 text-lg leading-relaxed text-gray-400">
                        Our mission is to create a dynamic community where alumni can stay engaged, network, and give back to the institution that shaped their academic and professional journeys. Through a comprehensive web and mobile platform, we offer alumni the ability to register, share their success stories, explore job opportunities, connect with peers, and contribute to the growth of the college. By facilitating lifelong relationships, professional development, and philanthropy, we aim to build a vibrant and supportive alumni community for years to come.
                    </p>
                </div>
                <div className='w-[100%]'>
                    <img className='w-[100%] mt-5 ' src={aboutsvg} alt="" />
                </div>
            </div>

            <div className='flex items-center'>
                <div className='px-6 w-[100%]'>
                    <img className='object-cover w-full h-full sm:w-3/4 sm:h-auto md:w-2/3 md:h-auto lg:w-[65%] lg:h-auto' src={about2} alt="" />
                </div>
                <div className='pr-10 w-[100%]'>
                    <h6 className="mt-6 text-3xl font-bold text-[#2d545e] sm:text-4xl md:text-5xl">
                    Our Mission: Build Connections Between Alumni
                    </h6>
                    <p className="mt-4 text-lg leading-relaxed text-gray-400">
                    Our mission is to create a dynamic community where alumni can stay engaged, network, and give back to the institution that shaped their academic and professional journeys.
                    </p>
                </div>
            </div>

        </section>
        <section>
                <MeetOurTeam/>
                
        </section>
        <AlumniEconnectFooter/>
        </>

    )
}

export default AboutUs
