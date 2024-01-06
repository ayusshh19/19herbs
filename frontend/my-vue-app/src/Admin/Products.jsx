import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import {
  DELETE_PRODUCT_RESET,
  NEW_PRODUCT_RESET,
  UPDATE_PRODUCT_RESET,
} from "../constants/productconstant";
import { useNavigate } from "react-router-dom";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
  updateProduct,
} from "../actions/productaction";
import Addproduct from "./Addproduct";
function Products() {
  const [newproductmodal, setnewproductmodal] = useState(false);
  const [editproductmodal, seteditproductmodal] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const { error, success } = useSelector((state) => state.newProduct);

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [currenteditid, setcurrenteditid] = useState("");
  const { productlisterror, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  const editproductmodalhandler = (prod) => {
    setcurrenteditid(prod._id);
    setName(prod.name);
    setCategory(prod.category);
    setDescription(prod.description);
    setOldImages(prod.images[0]?.url);
    setPrice(prod.price);
    seteditproductmodal(true);
  };
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  useEffect(() => {
    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/product");
      dispatch({ type: NEW_PRODUCT_RESET });
      setnewproductmodal(false);
    }
    if (productlisterror) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/product");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/product");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [
    dispatch,
    alert,
    error,
    deleteError,
    isDeleted,
    success,
    isUpdated,
    updateError,
  ]);
  const updateProductImagesChange = (e) => {
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
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct(currenteditid, {
        name: name,
        description: description,
        category: category,
        price: price,
        images: images,
      })
    );
    seteditproductmodal(false);
  };

  return (
    <div>
      <section class=" dark:bg-white py-3 sm:py-5">
        <div class="px-4 mx-auto max-w-screen-2xl lg:px-12">
          <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div class="flex items-center flex-1 space-x-4">
                <h5>
                  <span class="text-gray-500">All Products:</span>
                  <span class="dark:text-white">123456</span>
                </h5>
                <h5>
                  <span class="text-gray-500">Total sales:</span>
                  <span class="dark:text-white">$88.4k</span>
                </h5>
              </div>
              <div class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                <button
                  type="button"
                  class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-darkuse hover:bg-upperbar focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  onClick={() => setnewproductmodal(true)}
                >
                  <svg
                    class="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                  Add new product
                </button>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-white uppercase bg-darkuse dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                   
                    <th scope="col" class="px-4 py-3">
                      Product
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Category
                    </th>
                    <th scope="col" class="px-4 py-3">
                      name
                    </th>
                    <th scope="col" class="px-4 py-3">
                      description
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Price
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Fake Price
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Rating
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Edit
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((prod) => {
                      return (
                        <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                          
                          <td
                            class="w-full flex h-full items-center justify-center px-4 py-2"
                          >
                            <img
                              src={prod.images[0]?.url}
                              alt="iMac Front Image"
                              class="w-8 h-8 mr-3"
                            />
                          </td>
                          <td class="px-4 py-2">
                            <span class="bg-primary-100 text-darkuse text-lg font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                              {prod.category}
                            </span>
                          </td>
                          <td class="px-4 py-2 font-medium text-darkuse whitespace-nowrap dark:text-darkuse">
                            <div class="flex items-center">{prod.name}</div>
                          </td>
                          <td class="px-4 py-2 font-medium   text-darkuse  dark:text-darkuse break-words  ">
                            {prod.description}
                          </td>
                          <td class="px-4 py-2 font-medium text-darkuse whitespace-nowrap dark:text-darkuse">
                            {prod.price}
                          </td>
                          <td class="px-4 py-2 font-medium text-darkuse whitespace-nowrap dark:text-darkuse">
                            {prod.fakeprice}
                          </td>
                          {/* REVIEWS  */}
                          <td class="px-4 py-2 font-medium text-darkuse whitespace-nowrap dark:text-darkuse">
                            <div class="flex items-center">
                              <svg
                                aria-hidden="true"
                                class="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewbox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                aria-hidden="true"
                                class="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewbox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                aria-hidden="true"
                                class="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewbox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                aria-hidden="true"
                                class="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewbox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <svg
                                aria-hidden="true"
                                class="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewbox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span class="ml-1 text-gray-500 dark:text-gray-400">
                                5.0
                              </span>
                            </div>
                          </td>
                          {/* EDIT PRODUCT  */}
                          <td
                            class="px-4 py-2 cursor-pointer font-medium text-white whitespace-nowrap dark:text-white"
                            onClick={() => editproductmodalhandler(prod)}
                          >
                            <div class="flex items-center">
                              <svg
                                class="h-8 w-8 text-green-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                {" "}
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />{" "}
                                <polyline points="14 2 14 8 20 8" />{" "}
                                <line x1="12" y1="18" x2="12" y2="12" />{" "}
                                <line x1="9" y1="15" x2="15" y2="15" />
                              </svg>
                              1.6M
                            </div>
                          </td>
                          {/* DELETE PRODUCT  */}
                          <td
                            class="px-4 py-2 cursor-pointer"
                            onClick={() => deleteProductHandler(prod._id)}
                          >
                            <svg
                              class="h-8 w-8 text-green-600"
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
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>
      <Addproduct
        newproductmodal={newproductmodal}
        setnewproductmodal={setnewproductmodal}
      />
      <div
        id="crud-modal"
        tabindex="-1"
        aria-hidden="true"
        class={` ${
          editproductmodal ? "block" : "hidden"
        } fixed top-0  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div class="relative p-4 w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div class="relative bg-upperbar top-20 md:top-20 md:left-[80%] rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-lg font-semibold text-white dark:text-white">
                Edit Product
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
                onClick={() => seteditproductmodal(false)}
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <form class="p-4 md:p-5" onSubmit={updateProductSubmitHandler}>
              <div class="grid gap-4 mb-4 grid-cols-2">
                <div class="col-span-2">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-upperbar text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="price"
                    class="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    class="bg-gray-50 border border-gray-300 text-upperbar text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="2999"
                    required=""
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="category"
                    class="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    class="bg-gray-50 border border-gray-300 text-darkuse    text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option selected="">Select category</option>
                    <option value="Hairoil">Hairoil</option>
                    <option value="Face">Face</option>
                  </select>
                </div>
                <div class="col-span-2">
                  <label
                    class="block mb-2 text-sm font-medium text-white dark:text-white"
                    for="file_input"
                  >
                    Product Image
                  </label>
                  <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    onChange={updateProductImagesChange}
                  />
                </div>
                <div class="col-span-2">
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Product Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-upperbar bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write product description here"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                class="text-white inline-flex items-center bg-darkuse hover:bg-lightuse focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-upperbar dark:hover:bg-upperbar dark:focus:ring-blue-800"
              >
                <svg
                  class="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                EDIT PRODUCT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
