import React from "react";
import Navbar from "./compounds/Navbar";
import Hero from "./compounds/Hero";
import SecondaryHero from "./compounds/SecondaryHero";
import Feature from "./compounds/Feature";
import Pricing from "./compounds/Princing";
import Footer from "./compounds/Footer";
const LandingPage = () => {
  return (
    <>
      <Navbar />

      <Hero />
      <SecondaryHero />
      <Feature />
      <Pricing />
      <Footer />
    </>
  );
};

export default LandingPage;
