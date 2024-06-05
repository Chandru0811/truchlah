import React from "react";
// import Accod from "../Components/home/Accordian";
// import Vechicle from "../Components/home/TrucklahVechicle";
import ContactUs from "../Components/home/ContactUs";
import Hero from "../Components/home/Hero";
import Lead from "../Components/home/lead";
import Mob from "../Components/home/mobile";
import About from "../Components/home/about";
import ShiftPack from "../Components/home/ShiftPack";

function Home({ isAdmin }) {
  return (
    <div>
      <Hero isAdmin={isAdmin} />
      <ShiftPack />
      {/* <Vechicle /> */}
      <Lead />
      <Mob />
      <About />
      {/* <Accod /> */}
      <ContactUs />
    </div>
  );
}

export default Home;
