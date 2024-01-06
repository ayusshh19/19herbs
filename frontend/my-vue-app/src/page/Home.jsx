import React from "react";
import Maincorousel from "../components/Maincorousel";
import Footer from "../components/Footer";
import Quicktabs from "../components/Quickprod";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Faq";
import Services from "../components/Services";
import Quickview from "../components/Quickview";
import Addtocart from "../components/Addcart";
import Usercontextprovider from "../context/Usercontextprovider";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <Usercontextprovider>
      <Navbar />
      {/* <video
          loop
          autoPlay
          muted
          class="w-full sm:w-96 h-[80%] absolute sm:top-[10%] sm:left-[40%] z-10 block object-contain"
        >
          <source
            src="https://res.cloudinary.com/dbeptj8fp/video/upload/v1704290862/wgfyczb945mwbaftm8m7.mp4"
            type="video/mp4"
            className="w-full h-full"
          />
          Your browser does not support the video tag.
        </video> */}
      <Maincorousel />
      <Quicktabs />
      <Addtocart />
      {/* <Quickview /> */}
      <Services />
      <Testimonials />
      <Faq />
      <Footer />
    </Usercontextprovider>
  );
}

export default Home;
