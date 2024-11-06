import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import ReachOut from "../components/ContactUsComponent/Reachout";
import FaqMainComponent from "../components/FaqComponent/FaqMainComponent";
import CTA from "../components/CTAComponent/Cta";
import Footer from "../components/FooterComponent/FooterComponent";
import FeatureCard from "../components/FeaturesCard/Feature";

const Home = ({ isLoggedIn }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gap-2"> 
        <HeroSection />
        <FeatureCard />
        <FaqMainComponent />
        <ReachOut />
        <CTA />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
