import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./maincorousel.css";

const items = [
  <img
    src={
      "https://res.cloudinary.com/dbeptj8fp/image/upload/v1704955714/apcu1c7oazuf8n4ff3hi.png"
    }
    role="presentation"
    className="w-48   rounded-lg h-36 mx-2 object-contain"
  />,
  <img
    src={
      "https://res.cloudinary.com/dbeptj8fp/image/upload/v1704955704/v3rtgepfkms5w8nw5jxc.png"
    }
    role="presentation"
    className="w-48   rounded-lg h-36 mx-2 object-contain"
  />,
  <img
    src={
      "https://res.cloudinary.com/dbeptj8fp/image/upload/v1704955710/syz2dms2jxqh0yx3vs9j.png"
    }
    role="presentation"
    className="w-48   rounded-lg h-36 mx-2 object-contain"
  />,
  <img
    src={
      "https://res.cloudinary.com/dbeptj8fp/image/upload/v1704955704/v3rtgepfkms5w8nw5jxc.png"
    }
    role="presentation"
    className="w-48   rounded-lg h-36 mx-2 object-contain"
  />,
];

export default function Maincorousel() {
  return (
    <div className="  w-full h-full  sm:min-w-full flex  sm:h-[30rem] lg:h-[40rem] flex-wrap">
      <div className="flex justify-center sm:w-2/3">
        <img
          src="https://res.cloudinary.com/dbeptj8fp/image/upload/v1704959107/n3i1kr8yqafk14fpxa1n.png"
          alt=""
          className="h-5/6 w-full"
          srcset=""
        />
      </div>
      <div className="sm:w-1/3 w-full h-5/6 flex flex-wrap p-4 gap-5 sm:gap-0 flex-col sm:p-7 justify-center">
        <h1 className="sm:text-4xl text-5xl text-darkbutton sm:my-2 font-extrabold text-center sm:text-left">
          19HERBS
        </h1>
        <h1 className="sm:text-4xl text-2xl text-darkbutton sm:my-4 hidden sm:block">
          Be good to your skin. You’ll wear it every day for the rest of your
          life.{" "}
        </h1>
        <AliceCarousel
          mouseTracking
          items={items}
          disableButtonsControls
          autoPlay
          autoPlayInterval={3000}
          infinite
          responsive={{
            0: {
              items: 4,
            },
            1024: {
              items: 5,
            },
          }}
        />
        <button className="flex justify-center items-center hover:bg-white hover:text-darkbutton hover:border-2 hover:border-darkbutton bg-darkbutton text-white sm:text-2xl text-lg  sm:w-64 w-32 sm:py-3 py-1 top-3/4 px-1 rounded-lg m-auto">
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
      {/* <video
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
      </button> */}
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
