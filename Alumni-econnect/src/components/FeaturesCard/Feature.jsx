import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FeatureSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const features = [
    {
      title: "Alumni Registration",
      description: "Allow alumni to register, update their profiles, and connect with others.",
      img: "https://img.freepik.com/free-vector/registration-form-template-with-flat-design_23-2147971970.jpg?t=st=1726899722~exp=1726903322~hmac=2058e368e25350aa5b9f138d1cfd9536869352a30417b18f5202150a44509e2e&w=740", // Add your image path
    },
    {
      title: "Networking Hub",
      description: "Connect alumni based on interests, profession, and location.",
      img: "/src/assets/onlineconnect.jpg", 
    },
    {
      title: "Job Portal",
      description: "Provide job search and posting features for career advancement.",
      img: "https://img.freepik.com/premium-vector/job-interview-through-online-video-call-illustration_588233-435.jpg?w=740",
    },
    {
      title: "Alumni Directory",
      description: "Allow users to search for alumni by different criteria (filters).",
      img: "https://img.freepik.com/free-vector/character-illustration-people-with-data-concept-icons_53876-66132.jpg?t=st=1726900232~exp=1726903832~hmac=94cc569d862e4d89f46e8f491a77842fe8f8053bece9799f3f9efa74b88e9aef&w=740",
    },
    {
      title: "Success Story Tracking",
      description: "Showcase alumni achievements and inspire others.",
      img: "https://img.freepik.com/free-vector/businessmen-climb-growth-column-graph-career-personality-development-careerbuilder-career-planning-progress-concept-white-background_335657-2046.jpg?t=st=1726899769~exp=1726903369~hmac=6fb2665d26fa00ff3d97354d625e632c6adb83cb1481c9dfed5942d36ff8b0e7&w=740",
    },
    {
      title: "Events and Reunions",
      description: "Announce and manage alumni events and reunions.",
      img: "https://img.freepik.com/free-vector/tiny-people-high-school-students-dresses-suits-chatting-promenade-dance-prom-party-prom-night-invitation-promenade-school-dance-concept_335657-660.jpg?t=st=1726900407~exp=1726904007~hmac=8acd5401bd3d8a85c888dcc48514be9b01e3e2c9fbc5d060837ccb28c859527e&w=740",
    },
    {
      title: "Chat Section",
      description: "Real-time chat section for efficient communication.",
      img: "https://img.freepik.com/premium-vector/chatbox_1162360-3688.jpg?w=740",
    },
    {
      title: "Data Management",
      description: "Authority/College officials can manage users' data.",
      img: "https://img.freepik.com/premium-vector/man-is-backing-up-important-data-using-his-laptop-surrounded-by-various-storage-devices-data-graphics-man-backups-data-cloud_538213-151164.jpg?w=740",
    },
  ];

  return (
    <div className='w-3/4 m-auto mb-5'>
      <h2 className="text-center  text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d545e]  mb-14">Key Features...</h2>
      <div className="mt-20">
        <Slider {...settings}>
          {features.map((feature) => (
            <div key={feature.title} className="bg-white h-[350px] text-black rounded-xl p-4 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow">
              <img src={feature.img} alt={feature.title} className="h-40 w-50 mx-auto mb-4" />
              <div>
                <h3 className="text-center text-xl font-semibold" style={{ color: "#d27511" }}>{feature.title}</h3>
                <p className="text-center mt-2">{feature.description}</p>
              </div>
              <div className="flex justify-center mt-4">
                <button className="flex items-center bg-[#2d545e] text-white py-2 px-4 rounded">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l2 2m-2-2v6m6-18v2m2 2h-2m-2 0h-2m-2 0H8M6 6h2m2-2h2m2 0h-2m-2 0H8m2-2h2M4 8h2M2 10h2M0 12h2m2 0h2m-2 0h2M4 14h2m2 0h2M0 16h2m2 0h2m-2 0h2M4 18h2m2 0h2M0 20h2m2 0h2" />
                  </svg>
                  Access Now
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default FeatureSection;
