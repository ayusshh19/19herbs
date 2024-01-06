import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import corousel1 from "../assets/slide1.png";
import corousel2 from "../assets/slide2.png";
import "./maincorousel.css";

const items = [
  <img
    src={corousel1}
    role="presentation"
    className="w-full h-60  sm:min-w-full  sm:h-[30rem] lg:h-[40rem] "
  />,
  <img
    src={corousel2}
    role="presentation"
    className="w-full h-60 sm:min-w-full sm:h-[30rem] lg:h-[40rem] "
  />,
];

export default function Maincorousel() {
  return (
    <div className=" relative w-full h-60  sm:min-w-full  sm:h-[30rem] lg:h-[40rem]">
      <video
        className="w-full h-full sm:object-cover object-center object-fill"
        loop
        autoPlay
        muted
      >
        <source
          src="https://res.cloudinary.com/dbeptj8fp/video/upload/v1702539619/products/tk2utj9ovi1ubmnpj4la.mp4"
          type="video/mp4"
          className="w-full h-full"
        />
        Your browser does not support the video tag.
      </video>
      <button className="flex justify-center items-center absolute sm:left-24 left-5 hover:bg-white hover:text-[#0B522A] hover:border-2 hover:border-[#0B522A] bg-[#0B522A] text-white sm:text-2xl text-lg  sm:w-64 w-32   sm:py-3 py-1 top-3/4 px-1 ">
        shop now
        <svg
          class="h-8 w-8 "
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          {" "}
          <line x1="5" y1="12" x2="19" y2="12" />{" "}
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </div>
    // <AliceCarousel
    //   mouseTracking
    //   items={items}
    //   disableButtonsControls
    //   autoPlay
    //   autoPlayInterval={3000}
    //   infinite
    //   responsive={true}
    // />
  );
}
