import axios from "axios";
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    TOTAL_CART_ITEMS
  } from "../constants/cartconstant";
import { BASE_URL } from "../constants/baseurl";
//   import axios from "axios";
  
  // Add to Cart
  const products = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '#',
      price: 48,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
      Stock:12
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: '#',
      price: 35,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
      Stock:12
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: '#',
      price: 89,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
      Stock:12
    },
    {
      id: 4,
      name: 'Machined Mechanical Pencil',
      href: '#',
      price: 35,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      Stock:12
    },
    // More products...
  ]
  
  export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`${BASE_URL}/api/v1/product/${id}`);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: 100,
        fakeprice: data.product.fakeprice,
        quantity:quantity?quantity:1
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  // REMOVE FROM CART
  export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  // SAVE SHIPPING INFO
  export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };

  export const totalcartitems = (data) => async (dispatch) => {
    dispatch({
      type: TOTAL_CART_ITEMS,
    });
  
  };