import React, { useContext, useState } from "react";
import "./styles/main.css";
import SearchBlock from "./Home/SearchBlock";
import CategoryBlock from "./Home/CategoryBlock";
import Recommended from "./Home/Recommended";
import { backendApi } from "../hooks/axiosBase";
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import {
  getProductsByCategory,
  getProductsRandom,
  getProductsRecommended,
} from "../utils/requestProductsHome";
import { SkeletonC, SkeletonR } from "./Skeleton";
import AuthContext from "../context/AuthContext";
import UserBookings from "./User/UserBookings";

const Main = (props) => {
  const { auth, handleAuth, userAuth } = useContext(AuthContext);
  const [categorySelected, setcategory] = useState(0);
  const [products, setproducts] = useState([]);
  const [city, setCity] = useState(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const { response: categories, isLoading } = useFetch({
    api: backendApi,
    method: "get",
    url: "/categories",
  });
  // const { response: productsApi, isLoading: isLoadingProducts } = useFetch({
  //   api: backendApi,
  //   method: "get",
  //   url: auth ? "/products/recommended" : "/products/random",
  // });

  console.log(products)

  useEffect(() => {
    auth
      ? getProductsRecommended().then((res) => {
          setIsLoadingProducts(false);
          setproducts(res.data);
        })
      : getProductsRandom().then((res) => {
          setIsLoadingProducts(false);
          setproducts(res.data);
        });
  }, []);

  useEffect(() => {
    if (categorySelected != 0) {
      getProductsByCategory(categorySelected).then(({ data }) =>
        setproducts(data)
      );
    }
  }, [categorySelected]);

  return (
    <main>
      {/* <UserBookings /> */}
      <SearchBlock
        city={city}
        setCity={setCity}
        setproducts={setproducts}
        setIsLoadingProducts={setIsLoadingProducts}
      />
      {!isLoading ? (
        <CategoryBlock categories={categories} setcategory={setcategory} />
      ) : (
        <div className="category-block">
          <div className="content-categories">
            <ul className="list-categories">
              <SkeletonC />
            </ul>
          </div>
        </div>
      )}
      {/* <div className="category-block">
        <div className="content-categories">
          <ul className="list-categories">
            <SkeletonC />
          </ul>
        </div>
      </div> */}

      {!isLoadingProducts ? (
        <Recommended products={products} />
      ) : (
        <div className="recommended-block">
          <div className="content-recommended">
            <ul className="list-recommended">
              <SkeletonR />
            </ul>
          </div>
        </div>
      )}
      {/* <div className="recommended-block">
        <div className="content-recommended">
          <ul className="list-recommended">
            <SkeletonR />
          </ul>
        </div>
      </div> */}
    </main>
  );
};

export default Main;
