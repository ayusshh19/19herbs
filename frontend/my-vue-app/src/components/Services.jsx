import React from "react";
import natural from "../assets/naturallogo.png";
import skin from "../assets/skin.png";
import forall from "../assets/forall.png";
import eco from "../assets/eco.png";
function Services() {
  return (
    <>
      <div className="flex justify-around w-full items-center flex-wrap text-darktext">
        <div className="flex flex-col justify-center items-center p-5 sm:w-1/4">
          <div>
            <img
              src="https://res.cloudinary.com/dbeptj8fp/image/upload/v1704898046/jp76rq97gkooqijccvga.png"
              className="w-48 h-48"
              alt=""
              srcset=""
            />
          </div>
          <div className="flex flex-col justify-evenly">
            <h1 className="font-2xl my-4 font-extrabold text-darkbutton">100% Natural Products</h1>
            <p>
              Natural products are derived from natural sources like plants,
              animals, or minerals, offering health and wellness benefits
              through organic compounds and substances found in nature.
            </p>
          </div>
        </div>
        <div className="sm:w-1/3 flex justify-center items-center">
          <img
            src="https://res.cloudinary.com/dbeptj8fp/image/upload/v1704896884/fndatik6blo7nkhiji8p.png"
            className="sm:w-96 sm:h-96"
            alt=""
            srcset=""
          />
        </div>
        <div className="flex sm:w-1/4 flex-col justify-center p-5 items-center">
          <div className="flex flex-col justify-center">
            <h1 className="font-2xl my-4 font-extrabold text-darkbutton">Vegan Skincare</h1>
            <p>
              Natural products are derived from natural sources like plants,
              animals, or minerals, offering health and wellness benefits
              through organic compounds and substances found in nature.
            </p>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dbeptj8fp/image/upload/v1704899733/jyr4ekt00kqomhxgavbv.png"
              className="w-48 h-48"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>
      <div class="2xl:mx-auto 2xl:container mx-4 py-16">
        <div class="w-full relative flex items-center  justify-center">
          <video
            loop
            autoPlay
            muted
            class="w-full h-full absolute z-0 block rounded-lg object-cover"
          >
            <source
              src="https://res.cloudinary.com/dbeptj8fp/video/upload/v1700646387/yhl6lxpjb6gxydcl0cfv.mp4"
              type="video/mp4"
              className="w-full h-full"
            />
            Your browser does not support the video tag.
          </video>
          <div class="bg-darkbutton bg-opacity-70 rounded-lg lg:py-16 py-10 w-full  md:px-12 px-4 flex flex-col items-center justify-center relative z-40">
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
    </>
  );
}

export default Services;
