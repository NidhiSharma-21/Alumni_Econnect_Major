import React, { useState, useEffect } from "react";

const teamMembers = [
  { 
    name: "Jay Chourasiya", 
    role: "Backend Developer", 
    image: "https://img.freepik.com/premium-vector/cute-smiling-boy-avatar-flat-style-vector-illustration_710508-1241.jpg", 
    description: "Handles server-side logic, database management, API integration, and ensures efficient server performance.",
    linkedin: "https://www.linkedin.com/in/jaychourasiya",
    github: "https://github.com/jaychourasiya"
  },
  { 
    name: "Nidhi Sharma", 
    role: "Frontend Developer", 
    image: "https://cdn.icon-icons.com/icons2/3708/PNG/512/girl_female_woman_person_people_avatar_icon_230018.png", 
    description: "Specializes in building responsive and user-friendly web applications.",
    linkedin: "https://www.linkedin.com/in/nidhisharma",
    github: "https://github.com/nidhisharma"
  },
  { 
    name: "Khushi Rajput", 
    role: "Frontend Developer", 
    image: "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png", 
    description: "Responsible for creating beautiful and functional user interfaces.",
    linkedin: "https://www.linkedin.com/in/khushirajput",
    github: "https://github.com/khushirajput"
  },
  { 
    name: "Ramnarayan Sanodiya", 
    role: "Frontend Developer", 
    image: "https://cdn-icons-png.flaticon.com/512/4859/4859066.png", 
    description: "Focuses on improving user experience and application performance.",
    linkedin: "https://www.linkedin.com/in/ramnarayansanodiya",
    github: "https://github.com/ramnarayansanodiya"
  },
  { 
    name: "Prince Raghuwanshi", 
    role: "Backend Developer", 
    image: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-8-avatar-2754583_120515.png", 
    description: "Develops and maintains server-side components and APIs to ensure seamless integration.",
    linkedin: "https://www.linkedin.com/in/princeraghuwanshi",
    github: "https://github.com/princeraghuwanshi"
  },
];

const MeetOurTeam = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
  };

  useEffect(() => {
    let intervalId;
    if (isSmallScreen) {
      intervalId = setInterval(nextSlide, 3000);
    } else {
      setCurrentIndex(0);
    }
    return () => clearInterval(intervalId);
  }, [isSmallScreen]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-gray-100 mt-0 relative pb-12">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-4 relative">
          <h2 className={`text-${isSmallScreen ? '2xl' : '4xl'} font-bold text-gray-800 mb-6 flex items-center justify-center`}>
            Meet Our Team
          </h2>
        </div>
        <p className="text-lg text-gray-600 mb-12">
          Meet the talented team behind this project. We are a group of students passionate about creating innovative solutions.
        </p>
        <div className="relative">
          {isSmallScreen && (
            <>
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-800 hover:text-gray-600 focus:outline-none"
                onClick={prevSlide}
              >
                {/* Left Icon */}
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-800 hover:text-gray-600 focus:outline-none"
                onClick={nextSlide}
              >
                {/* Right Icon */}
              </button>
            </>
          )}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full md:w-1/3 lg:w-1/5 p-4"
                >
                  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center h-80">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mb-4 object-cover"
                    />
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-sm text-gray-500 mt-2 h-16 flex-grow">
                      {member.description}
                    </p>
                    <div className="flex mt-auto space-x-4">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <img
                          src="https://raw.githubusercontent.com/gist/sebastianmarines/ab8da37c9cec1198f424ea343a090f4c/raw/1877a68ed40a84838da52b9c4b9416ac3d91a418/linkedin.svg"
                          alt="LinkedIn"
                          className="w-6 h-6"
                        />
                      </a>
                      <a href={member.github} target="_blank" rel="noopener noreferrer">
                        <img
                          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                          alt="GitHub"
                          className="w-6 h-6"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetOurTeam;
