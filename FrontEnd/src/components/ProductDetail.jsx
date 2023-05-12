import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductHeader from "./Product-detail/ProductHeader";
import ProductGallery from "./Product-detail/ProductGallery";
import ProductGalleryDesktop from "./Product-detail/ProductGalleryDesktop";
import "./styles/product-detail/product-detail.css";
import ProductCharacteristics from "./Product-detail/ProductCharacteristics";
import ProductPolicies from "./Product-detail/ProductPolicies";
import ProductReservation from "./Product-detail/ProductReservation";
import ProductDescription from "./Product-detail/ProductDescription";
import useWindowSize from "../utils/useWindowSize";
import useFetch from "../hooks/useFetch";
import Loading from './Loading'

const ProductDetail = ({ modo }) => {
  const params = useParams();
  let { isLoading, error, response } = useFetch({
    url: "products/" + params.productId,
  });
  let { width } = useWindowSize();

  if (!!isLoading)
    return (
      <div className="product-detail-container">
        <Loading/>
      </div>
    );

  if (!!error)
    return (
      <div className="product-detail-container">
        <p>{error}</p>
      </div>
    );

  return (
    <>
      {!!response && (
        <div className="product-detail-container">
         
          <ProductHeader
            category={response.category.title}
            name={response.title}
            location={response.city}
            distance={response.distance}
            rating={response.quality}
          />
          {width > 1024 ? (
            <ProductGalleryDesktop images={response.images} />
          ) : (
            <ProductGallery images={response.images} />
          )}
          <ProductDescription
            title={response.titleDescription}
            description={response.description}
          />
          <ProductCharacteristics characteristics={response.feature} />
          <ProductReservation product={response}/>
         
          <ProductPolicies
            normsPolicy={response.normPolicy}
            securityPolicy={response.securityPolicy}
            cancellationPolicy={response.cancellationPolity}
          />
        </div>
      )}
    </>
  );
};

export default ProductDetail;
