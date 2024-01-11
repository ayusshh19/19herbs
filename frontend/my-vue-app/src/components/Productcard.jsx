import { useContext, useEffect, useState } from "react";
import Usercontext from "../context/Usercontext";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../actions/productaction";
import { useAlert } from "react-alert";

export default function Productcards({ setopen, value }) {
  const { setcurrentproductquickview } = useContext(Usercontext);
  const [category, setcategory] = useState(0);
  const handleproductcard = (product) => {
    setcurrentproductquickview(product);
    console.log(product);
    setopen(true);
  };
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  // const keyword = match.params.keyword;
  const keyword = "";

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    setcategory(value === 0 ? "Hairoil" : "Face");
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    ratings,
    alert,
    error,
    value,
  ]);
  return (
    <div className="cursor-pointer">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products &&
            products.map((product) => (
              <a
                key={product.id}
                className="group"
                onClick={() => handleproductcard(product)}
              >
                <div className="relative overflow-hidden rounded-xl h-64">
                  <img
                    className="w-full h-full object-contain group-hover:scale-125  duration-500"
                    src={product?.images[0]?.url}
                    alt={product.imageAlt}
                  />
                </div>
                {/* <div className=" w-full h-full overflow-hidden rounded-lg bg-gray-200 ">
                  <img
                    src={product?.images[0].url}
                    alt={product.imageAlt}
                    className="w-full h-full object-cover object-center group-hover:opacity-75"
                  />
                </div> */}

                <h3 className="mt-4 text-sm font-extrabold text-darkbutton">
                  {product.name}
                </h3>
                <p className="mt-1 text-lg font-medium text-textdark">
                  ₹{product.price}
                  <span className="ml-4 line-through text-gray-400">
                    ₹{product.fakeprice}
                  </span>
                </p>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
