import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, deleteOrder, getAllOrders } from "../actions/orderaction";
import { DELETE_ORDER_RESET } from "../constants/orderconstans";
import { getAllUsers } from "../actions/useraction";
import { useNavigate } from "react-router-dom";

function Orderscheckout() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const [derivedorder, setderivedorder] = useState();
  console.log(orders, users);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const singleorderhandle = (orderdata) => {
    navigate('/admin/order/singleorder',{state:orderdata})
  };
  useEffect(() => {
    const userMap = new Map();

    users.forEach((user) => {
      userMap.set(user._id, user);
    });
    const ordersWithUsers = orders.map((order) => {
      const userId = order.user;
      const user = userMap.get(userId);

      return {
        ...order,
        user: user, // Replace the user ID with the actual user object
      };
    });
    setderivedorder(ordersWithUsers);
    console.log(ordersWithUsers);
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);
  return (
    <div>
      <Sidebar />
      <div className="sm:mx-auto ml-10 max-w-screen-xl px-4 py-20 sm:px-8">
        <div class="flex flex-wrap -mx-3 mb-5" >
          <div class="w-full max-w-full sm:px-3 mb-6  mx-auto ">
            <div class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] m-5  text-darkbutton">
              <div class="relative flex flex-col min-w-0 break-words border-2  bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                <div class="flex-auto block py-8 pt-6 sm:px-9">
                  <div class="overflow-x-auto">
                    <table class="w-full my-0 align-middle text-dark border-neutral-200">
                      <thead class="align-bottom ">
                        <tr class="text-[0.95rem] text-secondary-dark font-extrabold  p-20">
                          <th class="pb-3 text-start min-w-[175px]">
                            Order ID
                          </th>
                          <th class="pb-3 text-end min-w-[100px]">
                            Payment Time
                          </th>
                          <th class="pb-3 text-end min-w-[100px]">Amount</th>
                          <th class="pb-3 pr-12 text-end min-w-[175px]">
                            Payment Status
                          </th>
                          <th class="pb-3 pr-12 text-end min-w-[100px]">
                            User
                          </th>
                          <th class="pb-3 text-end min-w-[50px]">DETAILS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {derivedorder &&
                          derivedorder.map((orderdata) => {
                            return (
                              <tr class="border-b border-dashed last:border-b-0 border-darkbutton">
                                <td class="p-3 pl-0">
                                  <div class="flex items-center">
                                    <div class="flex flex-col justify-start">
                                      <a
                                        href="javascript:void(0)"
                                        class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"
                                      >
                                        {" "}
                                        {orderdata._id}
                                      </a>
                                    </div>
                                  </div>
                                </td>
                                <td class="p-3 pr-0 text-end">
                                  <span class="font-semibold text-light-inverse text-md/normal">
                                    {orderdata.paidAt.split("T")[0]}{" "}
                                    {orderdata.paidAt.split("T")[1]}
                                  </span>
                                </td>
                                <td class="p-3 pr-0 text-end">
                                  <span class="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                    {orderdata.totalPrice}
                                  </span>
                                </td>
                                <td class="p-3 pr-12 text-end">
                                  <span class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                                    {" "}
                                    {orderdata.paymentInfo.status}
                                  </span>
                                </td>
                                <td class="pr-0 text-start">
                                  <span class="font-semibold text-light-inverse text-md/normal">
                                    {orderdata.user.name}
                                  </span>
                                </td>
                                <td class="p-3 pr-0 text-end">
                                  <button class="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center" onClick={()=>singleorderhandle(orderdata)}>
                                    <span class="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-4 h-4"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                      </svg>
                                    </span>
                                  </button>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orderscheckout;
