import React from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

function Singleorder() {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <Sidebar />
      <div className="sm:mx-auto ml-10 sm:w-full  px-2 py-20 sm:px-4 text-darkbutton">
        <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 ">
          <div class="px-4 pt-8">
            <p class="text-xl font-medium">Order Summary</p>
            <div class="mt-8 space-y-3 rounded-lg borde px-2 py-4 sm:px-6">
              {location.state &&
                location.state.orderItems.map((singledata) => {
                  return (
                    <div class="flex flex-col items-center  rounded-l sm:flex-row">
                      <img
                        class="m-2 h-24 w-28 rounded-md border object-contain object-center"
                        src={singledata.image}
                        alt=""
                      />
                      <div class="flex w-full flex-col px-4 py-4">
                        <span class="font-semibold">{singledata.name}</span>
                        <span class="float-right text-gray-400">
                          Quantity : {singledata.quantity}
                        </span>
                        <p class="text-lg font-bold"> ₹ {singledata.price}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div class="mt-10 flex flex-col justify-center gap-6 w-full px-4 pt-8 lg:mt-0">
            <div>
              <h1 className="text-2xl font-extrabold">Payment Info : </h1>
              <p>Payment Time - <span className="font-semibold">{location.state.paidAt.split("T")[0]} {location.state.paidAt.split("T")[1]}</span></p>
              <p>Payment ID - <span className="font-semibold">{location.state.paymentInfo.id}</span></p>
              <p>Payment status - <span className="font-semibold">{location.state.paymentInfo.status}</span></p>
            </div>
            <hr class="h-px  bg-darkbutton border-0 dark:bg-gray-700"></hr>
            <div>
              <h1 className="text-2xl font-extrabold">Shipping Info : </h1>
              <p>Phone No - <span className="font-semibold">{location.state.shippingInfo.phoneNo}</span></p>
              <p>Address - <span className="font-semibold">{location.state.shippingInfo.address}</span></p>
              <p>City - <span className="font-semibold">{location.state.shippingInfo.city}</span></p>
              <p>Pincode - <span className="font-semibold">{location.state.shippingInfo.pinCode}</span></p>
            </div>
            <hr class="h-px bg-darkbutton border-0 dark:bg-gray-700"></hr>
            <div>
              <h1 className="text-2xl font-extrabold">User Info : </h1>
              <p>name - <span className="font-semibold">{location.state.user.name}</span></p>
              <p>email - <span className="font-semibold">{location.state.user.email}</span></p>
              <p>Pincode - <span className="font-semibold">{location.state.shippingInfo.pinCode}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singleorder;
