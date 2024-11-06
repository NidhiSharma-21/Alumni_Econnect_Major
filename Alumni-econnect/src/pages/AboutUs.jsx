import React from 'react';
import aboutsvg from '../assets/aboutUs.svg';
import about2 from '../assets/aboutUs2-.png';
import MeetOurTeam from '../components/AboutComponent/MeetOurTeam';
import AlumniEconnectFooter from '../components/FooterComponent/FooterComponent';

const AboutUs = () => {
  return (
    <>
      {/* First section with About Us and image */}
      <section className="py-12 mt-6 bg-[#f0f4f8]">
        <div className="container mx-auto flex flex-wrap items-center justify-between p-8">
          <div className="w-full md:w-1/2 p-6">
            <h2 className="text-5xl font-extrabold text-[#2d545e] mb-6">
              Welcome to Our Community
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Our mission is to create a dynamic community where alumni can stay engaged, network, and give back to the institution that shaped their journeys. We strive to foster a sense of belonging and pride among alumni by providing platforms for collaboration, mentorship, and professional development. Through innovative events, resources, and communication, we aim to bridge the gap between current students and alumni, ensuring that the wealth of knowledge and experience within our community is shared and utilized.
            </p>
            <a href="/" className="inline-block px-6 py-3 text-white bg-[#2d545e] rounded-full shadow-lg hover:bg-[#1a3b41] transition duration-300">
              Learn More
            </a>
          </div>
          <div className="w-full md:w-1/2 p-6">
            <img className="w-full h-auto " src={aboutsvg} alt="About Us" />
          </div>
        </div>
      </section>

      {/* Second section with Mission and image */}
      <section className="py-12 bg-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between p-8">
          <div className="w-full md:w-1/2 p-6">
            <img className="w-full h-auto" src={about2} alt="Our Mission" />
          </div>
          <div className="w-full md:w-1/2 p-6">
            <h2 className="text-5xl font-extrabold text-[#2d545e] mb-6">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              We aim to build a vibrant and supportive alumni community for years to come, fostering connections and opportunities for personal and professional growth.We believe that by strengthening these ties, we can create a legacy of excellence and impact that benefits both our alumni and the institution as a whole. Together, we will cultivate a culture of lifelong learning, innovation, and service, ensuring that every alumni feels valued and connected.
            </p>
          </div>
        </div>
      </section>
      <MeetOurTeam />
      <AlumniEconnectFooter />
    </>
  );
};

export default AboutUs;
