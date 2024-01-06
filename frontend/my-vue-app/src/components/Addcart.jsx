import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Usercontext from "../context/Usercontext";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../actions/cartaction";
import { Link } from "react-router-dom";

export default function Addtocart({ history }) {
  const { cartaddhandlesidebar, setcartaddhandlesidebar } =
    useContext(Usercontext);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  const increaseQuantity = (id, quantity, stock) => {
    console.log(stock, id, quantity);
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  
  return (
    <Transition.Root show={cartaddhandlesidebar} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setcartaddhandlesidebar}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 ">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg  font-bold text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setcartaddhandlesidebar(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartItems.length > 0 ? (
                              cartItems.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.image}
                                      alt={product.imageAlt}
                                      className="h-full w-full  object-contain object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col ">
                                    <div>
                                      <div className="flex justify-between text-base font-bold text-gray-900">
                                        <h3>
                                          <a href={product.href}>
                                            {product.name}
                                          </a>
                                        </h3>
                                        <p className="ml-4">
                                          {" "}
                                          ₹{product.price * product.quantity}
                                          <p className=" line-through text-gray-400">
                                            ₹{product.fakeprice * product.quantity}
                                          </p>
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.color}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-center justify-between text-sm">
                                      <div class="flex flex-row justify-evenly items-center  w-full rounded-lg relative bg-transparent text-lg border-2 border-gray-200">
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
                                          onClick={() =>
                                            deleteCartItems(product.product)
                                          }
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
                                Please add product to cart to proceed
                              </h1>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-xl first-letter:sm:text-base font-bold  text-gray-900">
                        <p>Subtotal</p>
                        <p>{`₹ ${cartItems.reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )}`}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        {cartItems.length===0?(<Link
                          className={`${cartItems.length===0?"cursor-not-allowed disabled":""} flex items-center justify-center rounded-md border border-transparent bg-darkuse px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-upperbar`}
                        >
                          Checkout
                        </Link>):(<Link
                          to={"/checkout"}
                          className={` flex items-center justify-center rounded-md border border-transparent bg-darkuse px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-upperbar`}
                        >
                          Checkout
                        </Link>)}
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-darkuse  hover:text-upperbar mx-1"
                            onClick={() => setcartaddhandlesidebar(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
