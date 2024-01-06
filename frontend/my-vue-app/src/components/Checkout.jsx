import React, { useContext, useEffect } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { State } from "country-state-city";
import "./checkout.css";
import { useNavigate } from "react-router-dom";
import {
  addItemsToCart,
  removeItemsFromCart,
  saveShippingInfo,
} from "../actions/cartaction";
import Usercontext from "../context/Usercontext";
function Checkout({ handleNext }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const [fnameship, setfnameship] = useState(shippingInfo.fnameship);
  const [lnameship, setlnameship] = useState(shippingInfo.lnameship);
  const [address1, setAddress1] = useState(shippingInfo.address1);
  const [address2, setAddress2] = useState(shippingInfo.address2);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const { user } = useSelector((state) => state.user);
  const [finalammount, setfinalammount] = useState(false);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = finalammount > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = finalammount + tax + shippingCharges;

  // const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  //function to handle shipping details
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (
      !phoneNo ||
      !address1 ||
      !address2 ||
      !city ||
      !pinCode ||
      !lnameship ||
      !fnameship
    ) {
      alert.error("Please enter valid input");
      return;
    }
    if (!state || state === "Select State") {
      alert.error("Please select state before proceed");
      return;
    }
    if (phoneNo?.length < 10 || phoneNo?.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    const address = `${address1} / ${address2}`;
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    dispatch(saveShippingInfo({ lname:lnameship,fname:fnameship,address, city, state, pinCode, phoneNo }));
    handleNext();
  };

  // coupon model and about final
  const [coupon, setcoupon] = useState();
  const [couponmodalopen, setcouponmodelOpen] = useState(false);


  const { couponappliedfordiscount, setcouponappliedfordiscount } =
    useContext(Usercontext);

  //Function to apply the coupon
  const handlecouponfunc = () => {
    if (coupon === "HERBS20") {
      setcouponappliedfordiscount(true);
      setcouponmodelOpen(true);
    } else {
      alert.error(`Coupon invalid code `);
    }
  };
  const cancelButtonRef = useRef(null);

  //Cart Items for order summary
  const increaseQuantity = (id, quantity, stock) => {
    console.log(stock, id, quantity);
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  //decrement quantity
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  //Remove cart items
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  //handle ammount of final after discount is applied
  useEffect(() => {
    setfinalammount(
      cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    );
  }, [finalammount]);
  return (
    <div class=" w-full grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
      <Transition.Root show={couponmodalopen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setcouponmodelOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex flex-col  sm:items-center justify-center">
                      <div
                        className="absolute top-0 right-0 m-4 cursor-pointer"
                        onClick={() => setcouponmodelOpen(false)}
                      >
                        <svg
                          class="h-8 w-8 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <div className="sm:flex justify-evenly items-center gap-4">
                        <div className="mx-auto flex sm:h-24 sm:w-24 flex-shrink-0 items-center justify-evenly rounded-full bg-upperbar sm:mx-0 h-12 w-12">
                          <svg
                            class="h-24 w-24 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                          </svg>
                        </div>
                        <h1 className="text-6xl text-center">20% OFF</h1>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base text-center m-3 font-semibold leading-6 text-gray-900"
                        >
                          19 HERBS
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-center text-gray-500">
                            Congratulations on redeeming your coupon code. You
                            have successfully applied your coupon.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div class="px-4 pt-8 ordersummary">
        <p class="text-xl font-medium">Order Summary</p>
        <p class="text-gray-400">
          Check your items. And select a suitable shipping method.
        </p>
        <div className="flex-1 sm:h-1/2 px-4 overflow-auto scroll-smooth ">
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.length > 0 ? (
                  cartItems.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.image}
                          alt={product.imageAlt}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col ">
                        <div>
                          <div className="flex justify-evenly text-base font-bold text-gray-900">
                            <h3>
                              <a href={product.href}>{product.name}</a>
                            </h3>
                            <p className="ml-4">
                              {" "}
                              ₹{product.price * product.quantity}
                              <p className=" line-through text-gray-400">
                                ₹{product.fakeprice * product.quantity}
                              </p>
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-center justify-evenly text-sm">
                          <div class="flex flex-row justify-evenly items-center w-full sm:w-[30%] rounded-lg relative bg-transparent text-lg border-2 border-gray-200">
                            <button
                              data-action="decrement"
                              class="  text-darkuse hover:text-white hover:bg-upperbar h-full w-full   rounded-l cursor-pointer outline-none"
                              onClick={() =>
                                decreaseQuantity(
                                  product.product,
                                  product.quantity
                                )
                              }
                            >
                              <span class="m-auto text-xl sm:text-2xl font-thin">
                                −
                              </span>
                            </button>
                            <p className="my-1 mx-1 sm:mx-4 text-lg  font-thin text-darkuse">
                              {product.quantity}
                            </p>
                            <button
                              data-action="increment"
                              class="text-darkuse hover:text-white hover:bg-upperbar h-full w-full   rounded-r cursor-pointer"
                              onClick={() =>
                                increaseQuantity(
                                  product.product,
                                  product.quantity,
                                  product.stock
                                )
                              }
                            >
                              <span class="m-auto text-xl sm:text-2xl font-thin">
                                +
                              </span>
                            </button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-darkuse hover:text-upperbar mx-6 "
                              onClick={() => deleteCartItems(product.product)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <h1 className="text-upperbar text-2xl">
                    No products added into cart yet!!
                  </h1>
                )}
              </ul>
            </div>
          </div>
        </div>
        <h1 class="text-2xl font-semibold mt-8 text-darkuse">
          Apply Coupon Code
        </h1>

        <div class="mt-4 flex gap-2">
          <input
            type="text"
            id="coupon"
            name="coupon"
            class="w-full px-4  border border-gray-300 py-2 rounded-lg focus:ring focus:ring-upperbar focus:border-0 "
            placeholder="Enter your coupon code"
            onChange={(e) => setcoupon(e.target.value)}
          />
          <button
            class="bg-darkuse text-white px-4 py-2  rounded-lg hover:bg-upperbar focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            onClick={handlecouponfunc}
          >
            Apply
          </button>
        </div>
      </div>
      <div class="mt-10  px-4 sm:pt-8 lg:mt-0">
        <p class="text-xl font-medium">Delivery Address</p>
        <p class="text-gray-400">
          Add detailed address where you want your product to be delivered!
        </p>
        <form>
          <div class="grid gap-6 mb-3 md:grid-cols-2">
            <div>
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
                value={fnameship}
                onChange={(e) => setfnameship(e.target.value)}
              />
            </div>
            <div>
              <label
                for="last_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                required
                value={lnameship}
                onChange={(e) => setlnameship(e.target.value)}
              />
            </div>
          </div>
          <div class="mb-4">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address 1
            </label>
            <input
              type="text"
              id="address1"
              class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Room no / Floor / Apartment name"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
          </div>
          <div class="mb-4  ">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address 2
            </label>
            <input
              type="text    "
              id="address2"
              class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Street / Area / Nearby landmarks"
              required
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="company"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Eg. Kalyan"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <label
                for="website"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                State
              </label>
              <select
                data-te-select-init
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option>Select State</option>
                {State &&
                  State.getStatesOfCountry("IN").map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
              {/* <input
                type="text"
                id="state"
                class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Eg. Maharastra"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              /> */}
            </div>
            <div>
              <label
                for="phone"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Eg. 9029011290"
                pattern="[0-9]{10}"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div>
              <label
                for="code"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Pin code
              </label>
              <input
                type="text"
                id="pinCode"
                class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Area code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
          </div>

          <div class="mt-6 border-t border-b py-2">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Subtotal</p>
              <p class="font-semibold text-gray-900">{`₹ ${finalammount}`}</p>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Shipping</p>
              <p class="font-semibold text-gray-900">₹ 99</p>
            </div>
            {couponappliedfordiscount && (
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-red">Discount</p>
                <p class="font-semibold text-red">
                  - ₹ {Math.floor((20 * finalammount) / 100)}
                </p>
              </div>
            )}
          </div>
          <div class="mt-6 flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Total</p>
            <p class="text-2xl font-semibold text-gray-900">{`₹ ${
              finalammount - Math.floor((20 * finalammount) / 100)
            }`}</p>
          </div>
        </form>
        <button
          class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 hover:scale-105 transition-all duration-150 font-medium text-white flex justify-center items-center"
          onClick={shippingSubmit}
        >
          Place Order{" "}
          <svg
            class="h-8 w-8 text-white"
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
    </div>
  );
}

export default Checkout;
