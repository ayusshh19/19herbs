import React, { useEffect, useState } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import Checkout from "../components/Checkout";
import Payment from "./Payment";
import Summary from "./Summary";
import Usercontextprovider from "../context/Usercontextprovider";
import { loadUser } from "../actions/useraction";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import store from "../store";
import axios from "axios";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
export function StepperWithContent() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const data = useSelector((state)=>{
    state.user
  })
  const alert =useAlert()
  const navigate =useNavigate()
  console.log(data)
  async function getStripeApiKey() {
   try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/stripeapikey",
      { withCredentials: true }
    );
    setStripeApiKey(data.stripeApiKey);
   } catch (error) {
    if(!error.response.data.success){
      alert.error("Please login before checkout")
      navigate("/login")
    }
   }
  }

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
  return (
    <>
      <Usercontextprovider>
        <div className="w-[90%] sm:w-[80%] sm:mb-4 mx-auto sm:px-24 py-4">
          <Stepper
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
          >
            <Step>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                />
              </svg>

              <div className="absolute -bottom-[2.5rem]  w-max text-center">
                <Typography
                  color={activeStep === 0 ? "blue-gray" : "gray"}
                  className="font-normal hidden sm:block"
                >
                  Add Your shipping address
                </Typography>
              </div>
            </Step>
            <Step>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>

              <div className="absolute -bottom-[2.5rem] w-max text-center">
                <Typography
                  color={activeStep === 1 ? "blue-gray" : "gray"}
                  className="font-normal hidden sm:block"
                >
                  Make payment
                </Typography>
              </div>
            </Step>
            <Step>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>

              <div className="absolute -bottom-[2.5rem] w-max text-center">
                <Typography
                  color={activeStep === 2 ? "blue-gray" : "gray"}
                  className="font-normal hidden sm:block"
                >
                  Order summary
                </Typography>
              </div>
            </Step>
          </Stepper>
        </div>
        {activeStep === 0 ? <Checkout handleNext={handleNext} /> : ""}
        <Elements stripe={loadStripe(stripeApiKey)}>
          {activeStep === 1 ? <Payment handleNext={handleNext} /> : ""}
        </Elements>
        {activeStep === 2 ? <Summary handleNext={handleNext} /> : ""}
      </Usercontextprovider>
      {/* <div className=" flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div> */}
    </>
  );
}
