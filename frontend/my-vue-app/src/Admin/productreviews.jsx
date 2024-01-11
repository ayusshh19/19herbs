import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import { DELETE_REVIEW_RESET } from "../constants/productconstant";
import Sidebar from "./Sidebar";
import { deleteReviews, getreview } from "../actions/reviewaction";
import { useNavigate } from "react-router-dom";
import { clearErrors } from "../actions/useraction";

export default function Productreviews() {
  const { loading, reviews } = useSelector((state) => state.getallreviews);
  const {error: deleteError,isDeleted,message}=useSelector((state)=>state.deletereview)
  console.log(deleteError,isDeleted,message)
  const navigate =useNavigate()
  const dispatch = useDispatch();
  const deleteUserHandler = (id) => {
    dispatch(deleteReviews(id));
  };
  const alert =useAlert()
  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/review");
      dispatch({ type: DELETE_REVIEW_RESET});
    }
    dispatch(getreview());
    console.log("running")
  }, [dispatch, alert, deleteError, isDeleted, message]);

  return (
    <div>
      <Sidebar />
      <div class="sm:mx-auto ml-10 max-w-screen-xl    px-4 py-20 sm:px-8">
        <div class="flex items-center justify-between pb-6">
          <div>
            <h2 class="font-semibold text-gray-700">User Reviews</h2>
          </div>
        </div>
        <div class="overflow-y-hidden rounded-lg border">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-darkbutton text-left text-xs font-bold uppercase tracking-widest text-white">
                  <th class="px-5 py-3">Profile</th>
                  <th class="px-5 py-3">Name</th>
                  <th class="px-5 py-3">Ratings</th>
                  <th class="px-5 py-3">Comment</th>
                  <th class="px-5 py-3">Delete</th>
                </tr>
              </thead>
              <tbody class="text-darkbutton">
                {reviews &&
                  reviews.users?.map((data) => {
                    return (
                      <tr>
                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <img
                            class="w-10 h-10 rounded-full"
                            src={data.reviewprofileimage[0].url}
                            alt="Rounded avatar"
                          />
                        </td>
                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div class="flex items-center">
                            <div class="h-10 w-10 flex-shrink-0">
                              <img
                                class="h-full w-full rounded-full"
                                src="https://static.thenounproject.com/png/4035887-200.png"
                                alt=""
                              />
                            </div>
                            <div class="ml-3">
                              <p class="whitespace-no-wrap">{data.user}</p>
                            </div>
                          </div>
                        </td>
                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p class="whitespace-no-wrap">{data.rating}</p>
                        </td>
                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p class="whitespace-no-wrap">{data.comment}</p>
                        </td>
                        <td class="border-b border-gray-200 cursor-pointer bg-white px-5 py-5 text-sm"
                        onClick={()=>deleteUserHandler(data._id)}
                        >
                          <svg
                            class="h-8 w-8 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
