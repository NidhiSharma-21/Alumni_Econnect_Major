import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

function FeatureSection() {
  const navigate = useNavigate();
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      }
    ]
  };

  const features = [
    {
      title: "Alumni Registration",
      description: "Allow alumni to register, update their profiles, and connect with others.",
      img: "https://img.freepik.com/free-vector/registration-form-template-with-flat-design_23-2147971970.jpg"
    },
    {
      title: "Networking Hub",
      description: "Connect alumni based on interests, profession, and location.",
      img: "https://img.freepik.com/free-vector/online-communication-concept-illustration_114360-1034.jpg"
    },
    {
      title: "Job Portal",
      description: "Provide job search and posting features for career advancement.",
      img: "https://img.freepik.com/premium-vector/job-interview-through-online-video-call-illustration_588233-435.jpg"
    },
    {
      title: "Alumni Directory",
      description: "Search for alumni by different criteria with advanced filters.",
      img: "https://img.freepik.com/free-vector/character-illustration-people-with-data-concept-icons_53876-66132.jpg"
    },
    {
      title: "Success Stories",
      description: "Showcase alumni achievements and inspire others.",
      img: "https://img.freepik.com/free-vector/businessmen-climb-growth-column-graph-career-personality-development-careerbuilder-career-planning-progress-concept-white-background_335657-2046.jpg"
    },
    {
      title: "Events & Reunions",
      description: "Announce and manage alumni events and reunions.",
      img: "https://img.freepik.com/free-vector/tiny-people-high-school-students-dresses-suits-chatting-promenade-dance-prom-party-prom-night-invitation-promenade-school-dance-concept_335657-660.jpg"
    }
  ];

  const handleExploreClick = () => {
    navigate('/login');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d545e] dark:text-[#4fd1c5] mb-4">
            Key Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the powerful tools designed to connect and empower our alumni community
          </p>
        </div>

        <div className="relative">
          <Slider {...settings}>
            {features.map((feature, index) => (
              <div key={index} className="px-4 focus:outline-none">
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={feature.img} 
                      alt={feature.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {feature.description}
                    </p>
                  </div>
                  <div className="px-6 pb-6">
                    <button 
                      onClick={handleExploreClick}
                      className="w-full py-2 px-4 bg-gradient-to-r from-[#2d545e] to-[#3f7b88] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                    >
                      <span>Explore</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;