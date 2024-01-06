import React from "react";
import natural from "../assets/naturallogo.png";
import skin from "../assets/skin.png";
import forall from "../assets/forall.png";
import eco from "../assets/eco.png";
function Services() {
  return (
    <div class="2xl:mx-auto 2xl:container mx-4 py-16">
      <div class="w-full relative flex items-center justify-center">
        {/* <img src="https://i.ibb.co/4sYZ8gC/img-2.png" alt="dining" class="w-full h-full absolute z-0 hidden xl:block" />
    <img src="https://i.ibb.co/bbS3J9C/pexels-max-vakhtbovych-6301182-1.png" alt="dining" class="w-full h-full absolute z-0 hidden sm:block xl:hidden" />
    <img src="https://i.ibb.co/JKkzGDs/pexels-max-vakhtbovych-6301182-1.png" alt="dining" class="w-full h-full absolute z-0 sm:hidden" /> */}
        <video
          loop
          autoPlay
          muted
          class="w-full h-full absolute z-0 block object-cover"
        >
          <source
            src="https://res.cloudinary.com/dbeptj8fp/video/upload/v1700646387/yhl6lxpjb6gxydcl0cfv.mp4"
            type="video/mp4"
            className="w-full h-full"
          />
          Your browser does not support the video tag.
        </video>
        <div class="bg-darkuse bg-opacity-50  lg:py-16 py-10 w-full  md:px-12 px-4 flex flex-col items-center justify-center relative z-40">
          <h1 class="text-4xl font-semibold leading-9 text-white text-center">
            Why choose our products?
          </h1>
          <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div class="flex items-center rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                <img
                  src={natural}
                  alt=""
                  srcset=""
                  className="h-18 w-18 text-blue-400"
                />
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">100% Natural</h2>
              </div>
            </div>

            <div class="flex items-center rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                <img
                  src={forall}
                  alt=""
                  srcset=""
                  className="h-18 w-18 text-blue-400"
                />
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">For All age groups</h2>
              </div>
            </div>
            <div class="flex items-center rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                <img
                  src={skin}
                  alt=""
                  srcset=""
                  className="h-18 w-18 text-blue-400"
                />
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">Skin Friendly</h2>
              </div>
            </div>
            <div class="flex items-center rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                <img
                  src={eco}
                  alt=""
                  srcset=""
                  className="h-18 w-18 text-blue-400"
                />
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">Eco</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
