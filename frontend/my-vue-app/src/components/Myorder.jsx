import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from '../actions/orderaction';
function Myorder() {
  const dispatch = useDispatch()
  const data = useSelector((state)=>state.myOrders)
  console.log(data)
  useEffect(()=>{
    dispatch(myOrders())
  },[])
  return (
    <div>
      
      <div className="sm:mx-auto ml-10 max-w-screen-xl px-4 py-20 sm:px-8">
        <div class="flex flex-wrap -mx-3 mb-5" >
          <div class="w-full max-w-full sm:px-3 mb-6  mx-auto ">
            <div class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] m-5  text-darkuse">
              <div class="relative flex flex-col min-w-0 break-words border-2  bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                <div class="flex-auto block py-8 pt-6 sm:px-9">
                  <div class="overflow-x-auto">
                    <table class="w-full my-0 align-middle text-dark border-neutral-200">
                      <thead class=" align-middle">
                        <tr class="text-[0.95rem] text-secondary-dark text-center font-extrabold  p-20">
                          <th class="pb-3 text-start min-w-[175px]">
                            Ordered Items
                          </th>
                          <th class="pb-3 text-center min-w-[100px]">
                            Payment Info
                          </th>
                          <th class="pb-3 text-center min-w-[100px]">Shipping Info</th>
                          
                          <th class="pb-3 text-center min-w-[50px]">Amount </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data.orders?.map((orderdata) => {
                            return (
                              <tr class="border-b border-dashed last:border-b-0 border-darkuse">
                                <td class="p-3 pl-0">
                                  <div class="flex justify-center items-center">
                                    <div class="flex justify-center flex-wrap">
                                      {orderdata.orderItems.map((orderitem) =>{
                                        return (
                                          <>
                                          <img className='w-8 h-8 object-cover rounded-md m-2' src={orderitem.image} alt="" srcset="" /></>
                                        )
                                      }
                                      
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td class="p-3 pr-0 text-start">
                                  <span class="font-semibold  text-light-inverse text-md/normal">
                                    Payment ID : {orderdata.paymentInfo.id}<br></br>
                                    Payment status : {orderdata.paymentInfo.status}<br></br>
                                    Date  : {orderdata.paidAt.split("T")[0]}
                                  </span>
                                </td>
                                <td class="p-3 pr-0 text-start">
                                  <span class=" align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                    Address : {orderdata.shippingInfo.address} <br></br>
                                    city : {orderdata.shippingInfo.city}<br></br>
                                    Pincode : {orderdata.shippingInfo.pinCode}
                                  </span>
                                </td>
                                <td class="p-3 pr-0 text-start">
                                <span class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                                    {" "}
                                    {Math.round(orderdata.totalPrice)}
                                  </span>
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
  )
}

export default Myorder