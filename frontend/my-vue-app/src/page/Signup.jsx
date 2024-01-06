import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Usercontextprovider from "../context/Usercontextprovider";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, register } from "../actions/useraction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

function Signup() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  console.log(error, loading, isAuthenticated)
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  console.log(user)
  const { fname,lname, email, password } = user;

  const registerSubmit = (e) => {
    e.preventDefault();
    dispatch(register(user));
  };
  const registerDataChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) 
    {
    alert.success("register successful");
      navigate("/")
    }
  }, [dispatch, error, alert, isAuthenticated]);
  return (
    <Usercontextprovider>
      <Navbar />
      <div class="pb-16">
        <div class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div class="hidden lg:w-1/2 bg-cover lg:flex lg:justify-center lg:items-center p-6 rounded-lg   ">
            <img
              class="h-auto max-w-full"
              className="rounded-lg"
              src="https://i.pinimg.com/564x/6a/2e/11/6a2e11642460401877619b861d6baf39.jpg"
              alt="image description"
            />
          </div>
          <div class="w-full p-8 lg:w-1/2">
            <h2 class="text-2xl font-semibold text-gray-700 text-center">
              19 HERBS
            </h2>
            <p class="text-xl text-darkuse text-center">
              Welcome create an free account to join us!
            </p>
            <a
              href="#"
              class="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <div class="px-4 py-3">
                <svg class="h-6 w-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>
              <h1 class="px-4 py-3 w-5/6 text-center text-darkuse font-bold">
                Sign in with Google
              </h1>
            </a>
            <div class="mt-4 flex items-center justify-between">
              <span class="border-b w-1/5 lg:w-1/4"></span>
              <a href="#" class="text-xs text-center text-gray-500 uppercase">
                or login with email
              </a>
              <span class="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <div class=" grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label
                  for="first-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
               
                >
                  First name
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="fname"
                    id="first-name"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-upperbar placeholder:text-upperbar focus:ring-2 focus:ring-inset focus:ring-lightuse sm:text-sm sm:leading-6"
                    value={fname}
                    onChange={registerDataChange}
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="last-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="lname"
                    id="last-name"
                    autocomplete="family-name"
                    class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-upperbar placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={lname}
                    onChange={registerDataChange}
                  />
                </div>
              </div>

              <div class="sm:col-span-6">
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-upperbar placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
              </div>
              <div class="sm:col-span-6">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div class="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-upperbar    placeholder:text-darkuse focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
              </div>
            </div>
            <div class="mt-8">
              {
                loading ? (<button disabled="" type="button" class="py-2 px-4 w-full text-sm font-medium text-gray-900 bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-darkuse focus:text-darkuse dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex justify-center items-center text-center">
                <svg aria-hidden="true" role="status" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1B5D04"></path>
                </svg>
                Loading...
            </button>):(              <button class="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600" onClick={registerSubmit}>
                Sign Up
              </button>)
              }

            </div>
            <div class="mt-4 flex items-center justify-between">
              <span class="border-b w-1/5 border-upperbar  md:w-1/4"></span>
              <Link to={'/login'} class="text-xs text-gray-500 uppercase">
                or Login
              </Link>
              <span class="border-b border-upperbar  w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Usercontextprovider>
  );
}

export default Signup;
