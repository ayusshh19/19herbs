import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Summary() {
  const { order } = useSelector((state) => state.newOrder);
  const { user } = useSelector((state) => state.user);
  console.log(order);
  const navigate =useNavigate()
  const returnhome =()=>{
    localStorage.removeItem("cartItems")
    localStorage.removeItem("shippingInfo")
    navigate("/")
  }
  return (
    order && (
      <div>
        <div class="py-14 px-3 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          <div class="flex justify-between flex-wrap item-start space-y-2">
            <div>
              <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-darkbutton">
                Order #13432
              </h1>
              <p class="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                {order.order.createdAt.split("T")[0]} At{" "}
                {order.order.createdAt.split("T")[1]}
              </p>
            </div>
            <button class=" md:mt-0 dark:border-white hover:text-white rounded dark:hover:bg-darkbutton dark:bg-transparent dark:text-white py-5 hover:bg-darkbutton focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkbutton border border-darkbutton  w-96 2xl:w-96 text-base font-medium leading-4 text-darkbutton" onClick={returnhome}>
              Continue Shopping
            </button>
          </div>
          <div class="mt-2 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div class="flex flex-col justify-start items-start dark:bg-darkbutton     px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-darkbutton">
                  Customer’s Cart
                </p>

                <div class="flex justify-center w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8 flex-wrap">
                  <div class="mt-8 space-y-3 rounded-lg border flex flex-col  w-full sm:w-[45%]  px-2 py-4 sm:px-6">
                    {order.order.orderItems?.map((item) => {
                      return (
                        <div class="flex  rounded-lg  sm:flex-row">
                          <img
                            class="m-2 w-full h-24 sm:w-40 rounded-md border object-contain object-center"
                            src={item.image}
                            alt=""
                          />
                          <div class="flex w-full flex-col px-4 py-4">
                            <span class="font-bold text-darkbutton">{item.name}</span>
                            <span class="float-right text-gray-400">
                              quantity : {item.quantity}
                            </span>
                            <p class="text-lg font-bold text-darktext">₹ {item.price}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full sm:w-1/2 justify-center  dark:bg-darkbutton space-y-6">
                    <h3 class="text-xl dark:text-white font-semibold leading-5 text-darkbutton">
                      Summary
                    </h3>
                    <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                      <div class="flex justify-between w-full">
                        <p class="text-base dark:text-white leading-4 text-darkbutton">
                          Subtotal
                        </p>
                        <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                        ₹1756.00
                        </p>
                      </div>
                      <div class="flex justify-between items-center w-full">
                        <p class="text-base dark:text-white leading-4 text-darkbutton">
                          Discount{" "}
                          <span class="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-darkbutton leading-3 text-darkbutton">
                            Special
                          </span>
                        </p>
                        <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                          -₹328.00 (20%)
                        </p>
                      </div>
                      <div class="flex justify-between items-center w-full">
                        <p class="text-base dark:text-white leading-4 text-darkbutton">
                          Shipping
                        </p>
                        <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                        ₹80.00
                        </p>
                      </div>
                    </div>
                    <div class="flex justify-between items-center w-full">
                      <p class="text-base dark:text-white font-semibold leading-4 text-darkbutton">
                        Total
                      </p>
                      <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                      ₹1456.00
                      </p>
                    </div>
                  </div>
                  <div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full    dark:bg-darkbutton space-y-6">
                    <h3 class="text-xl dark:text-white font-semibold leading-5 text-darkbutton">
                      Shipping
                    </h3>
                    <div class="flex justify-between items-start w-full">
                      <div class="flex justify-center items-center space-x-4">

                        <div class="flex flex-col justify-start items-center">
                          <p class="text-lg leading-6 dark:text-white font-semibold text-darkbutton">
                            DPD Delivery
                            <br />
                            <span class="font-normal">Our Delivery</span>
                          </p>
                        </div>
                      </div>
                      <p class="text-lg font-semibold leading-6 dark:text-white text-darkbutton">
                      ₹80.00
                      </p>
                    </div>
                    <div class="w-full flex justify-center items-center">
                      <button class="hover:bg-darktext dark:bg-white dark:text-darkbutton dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkbutton py-5 w-96 md:w-full bg-darkbutton text-base font-medium leading-4 text-white hover:text-darkbutton border-darkbutton border-2">
                        View Carrier Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="   dark:bg-darkbutton w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
              <h3 class="text-xl dark:text-white font-semibold leading-5 text-darkbutton">
                Customer
              </h3>
              <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                <div class="flex flex-col justify-start items-start flex-shrink-0">
                  <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                    <img
                      src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                      alt="avatar"
                    />
                    <div class="flex justify-start items-start flex-col space-y-2">
                      <p class="text-base dark:text-white font-semibold leading-4 text-left text-darkbutton">
                        {user.name}
                      </p>
                      <p class="text-sm dark:text-gray-300 leading-5 text-gray-600">
                        10 Previous Orders
                      </p>
                    </div>
                  </div>

                  <div class="flex justify-center text-darkbutton dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3 7L12 13L21 7"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p class="cursor-pointer text-sm leading-5 ">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                  <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                    <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                      <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-darkbutton">
                        Shipping Address
                      </p>
                      <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                        Address : {order.order.shippingInfo.address} <br></br>{" "}
                        City : {order.order.shippingInfo.city} <br></br> pincode
                        : {order.order.shippingInfo.pinCode}
                      </p>
                    </div>
                  </div>
                  {/* <div class="flex w-full justify-center items-center md:justify-start md:items-start">
                  <button class=" md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkbutton border border-darkbutton  w-96 2xl:w-full text-base font-medium leading-4 text-darkbutton">
                    Edit Details
                  </button>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Summary;
