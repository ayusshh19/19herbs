import React, { useEffect, useState } from "react";
import { createreview, getreview } from "../actions/reviewaction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

function Testimonials() {
  const [currentstart, setcurrentstart] = useState(false);
  const [ratings, setratings] = useState(5);
  const [comments, setcomments] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    setratings(event.target.value); 
  };
  const alert = useAlert();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, reviews } = useSelector((state) => state.getallreviews);
  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createreview({
        rating: ratings,
        comment: comments,
        reviewprofileimage: images,
        user: user.name,
      })
    );
    setcurrentstart(false);
    alert.success("Thank you for your input and feedback");
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  useEffect(() => {
    dispatch(getreview());
  }, []);

  return (
    <section class="flex flex-col justify-center items-center ">
      <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 class="text-center text-4xl font-bold tracking-tight text-darkbutton  sm:text-5xl">
          Read trusted reviews from our customers
        </h2>

        <div class="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
          {!loading &&
            reviews.users?.map((reviewdata) => {
              if(reviewdata.rating>3){
                return (
                  <div class="mb-8 sm:break-inside-avoid">
                    <blockquote class="rounded-lg bg-lighttext p-6 shadow-sm sm:p-8">
                      <div class="flex items-center gap-4">
                        <img
                          alt="Man"
                          src={
                            reviewdata.reviewprofileimage.length > 0
                              ? reviewdata.reviewprofileimage[0].url
                              : "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                          }
                          class="h-14 w-14 rounded-full object-cover"
                        />
  
                        <div>
                          <div class="flex justify-start gap-0.5 text-green-500">
                            {Array.apply(0, Array(reviewdata.rating)).map(function (x, i) {
                              return (
                                <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                              );
                            })}
                            
                          </div>
  
                          <p class="mt-0.5 text-lg font-extrabold text-white">
                            {reviewdata.user}
                          </p>
                        </div>
                      </div>
  
                      <p class="mt-4 text-white">{reviewdata.comment}</p>
                    </blockquote>
                  </div>
                );
              }
            })}
        </div>
      </div>
      {isAuthenticated && (
        <div>
          <button
            class="w-full bg-darktext px-6 py-3 rounded text-sm text-center font-bold uppercase tracking-wide text-white transition-none hover:bg-darktext sm:mt-0 sm:w-auto sm:shrink-0"
            onClick={() => setcurrentstart(true)}
          >
            Click here to share your with us!
          </button>
          <div
            id="crud-modal"
            tabindex="-1"
            aria-hidden="true"
            class={`${
              currentstart ? "" : "hidden"
            } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
          >
            <div class="relative p-4 w-full max-w-md max-h-full">
              <div class="bg-gray-200 min-w-1xl flex flex-col rounded-xl shadow-lg">
                <div class="px-12 py-5 pt-12">
                  <h2 class="text-gray-800 text-3xl text-center font-semibold">
                    Your opinion matters to us!
                  </h2>
                </div>
                <div
                  className="absolute right-7 top-7 cursor-pointer"
                  onClick={() => setcurrentstart(false)}
                >
                  <svg
                    class="h-8 w-8 text-darktext"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <line x1="18" y1="6" x2="6" y2="18" />{" "}
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>

                <div class="bg-gray-200 w-full flex flex-col items-center">
                  <div class="flex flex-col items-center py-6 space-y-3">
                    <span class="text-lg text-gray-800">
                      How was quality of our products?
                    </span>
                    <div class="flex space-x-3">
                      <div class="flex flex-row-reverse justify-end items-center">
                        <input
                          id="hs-ratings-readonly-1"
                          type="radio"
                          class="peer -ms-10 w-10 h-10 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                          name="hs-ratings-readonly"
                          value="5"
                          onChange={handleInputChange}
                        />
                        <label
                          for="hs-ratings-readonly-1"
                          class="peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-gray-600"
                        >
                          <svg
                            class="flex-shrink-0 w-10 h-10"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        </label>
                        <input
                          id="hs-ratings-readonly-2"
                          type="radio"
                          class="peer -ms-5 w-5 h-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                          name="hs-ratings-readonly"
                          value="4"
                          onChange={handleInputChange}
                        />
                        <label
                          for="hs-ratings-readonly-2"
                          class="peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-gray-600"
                        >
                          <svg
                            class="flex-shrink-0 w-10 h-10"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        </label>
                        <input
                          id="hs-ratings-readonly-3"
                          type="radio"
                          class="peer -ms-5 w-5 h-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                          name="hs-ratings-readonly"
                          value="3"
                          onChange={handleInputChange}
                        />
                        <label
                          for="hs-ratings-readonly-3"
                          class="peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-gray-600"
                        >
                          <svg
                            class="flex-shrink-0 w-10 h-10"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        </label>
                        <input
                          id="hs-ratings-readonly-4"
                          type="radio"
                          class="peer -ms-5 w-5 h-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                          name="hs-ratings-readonly"
                          value="2"
                          onChange={handleInputChange}
                        />
                        <label
                          for="hs-ratings-readonly-4"
                          class="peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-gray-600"
                        >
                          <svg
                            class="flex-shrink-0 w-10 h-10"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        </label>
                        <input
                          id="hs-ratings-readonly-5"
                          type="radio"
                          class="peer -ms-5 w-5 h-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                          name="hs-ratings-readonly"
                          value="1"
                          onChange={handleInputChange}
                        />
                        <label
                          for="hs-ratings-readonly-5"
                          class="peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-gray-600"
                        >
                          <svg
                            class="flex-shrink-0 w-10 h-10"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="w-3/4 flex flex-col">
                    <textarea
                      rows="3"
                      class="p-4 text-gray-500 rounded-xl resize-none"
                      onChange={(e) => setcomments(e.target.value)}
                    >
                      Leave a message, if you want
                    </textarea>
                    <div class="col-span-2">
                      <label
                        class="block mb-2 text-sm font-medium text-white dark:text-white"
                        for="file_input"
                      >
                        Add profile image for better display of your review
                      </label>
                      <input
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        onChange={createProductImagesChange}
                      />
                    </div>
                    <button
                      class="py-3 my-8 text-lg bg-gradient-to-r from-gray-50 to-darktext hover:from-upperbar hover:to-darktext rounded-xl text-white"
                      onClick={createProductSubmitHandler}
                    >
                      Rate now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Testimonials;
