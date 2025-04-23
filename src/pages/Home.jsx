import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import ReachOut from "../components/ContactUsComponent/Reachout";
import FaqMainComponent from "../components/FaqComponent/FaqMainComponent";
import CTA from "../components/CTAComponent/Cta";
import Footer from "../components/FooterComponent/FooterComponent";
import FeatureCard from "../components/FeaturesCard/Feature";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Shared/Input/Loader";

const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate ();
  const {loading ,user} = useAuth();
  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [loading, user, navigate]);  
  if(loading){
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader color="blue" size="md"/>
      </div>
    );
  }
  if (user) {
    return null; // Prevent rendering the login page if user is authenticated
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gap-2"> 
        <HeroSection />
        <FeatureCard />
        <FaqMainComponent />
        <CTA />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
