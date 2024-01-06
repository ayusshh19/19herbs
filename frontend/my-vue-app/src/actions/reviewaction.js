import axios from "axios";
import { ALL_REVIEW_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS } from "../constants/productconstant";

export const createreview = (productData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
      console.log(productData)
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const  {data}  = await axios.post(
        `http://localhost:4000/api/v1/new/review`,
        productData,
        config
      );
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type:NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const getreview =
  () =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_REVIEW_REQUEST });

      const { data } = await axios.get("http://localhost:4000/api/v1/all/review");
      console.log(data);

      dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  export const deleteReviews = (reviewId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST });
      const config = { withCredentials: true };

      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/admin/reviewdelete/${reviewId}`,config
      );

  
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };