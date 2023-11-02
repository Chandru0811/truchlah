import React from "react";
import Accod from "../Components/Accordian";
import Vechicle from "../Components/TrucklahVechicle";
import ContactUs from "../Components/ContactUs";
import Hero from "../Components/Hero";
import Lead from "../Components/lead";
import Mob from "../Components/mobile";
import About from "../Components/about";
import ShiftPack from "../Components/ShiftPack";

function Home() {
  return (
    <div>
      <Hero />
      <ShiftPack />
      <Vechicle />
      <Lead />
      <Mob />
      <About />
      <Accod />
      <ContactUs />
      
    </div>
  );
}

export default Home;
