import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import LandingPage from "../Pages/LandingPage";

function Home() {
  return (
    <div className="font-body-md text-on-surface bg-background">
      <Navbar />
      <LandingPage />
      <Footer />

    </div>
  );
}

export default Home;