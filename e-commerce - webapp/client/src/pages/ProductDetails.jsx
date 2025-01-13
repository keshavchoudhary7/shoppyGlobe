import React, { useEffect, useState } from "react";
import Layouts from "../components/layout/Layouts";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts , setRelatedProducts] = useState([])
  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //fetch product details based on slug paramater
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/get-products/${
          params.slug
        }`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id)
    } catch (error) {
      console.log(error);
    }
  };

  //get similar category
  const getSimilarProducts = async(pid,cid)=>{
    try {
        const {data} = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/v1/product/related-product/${pid}/${cid}`
        )
        setRelatedProducts(data?.products)
    } catch (error) {
        console.log(error)
    }
  }


  return (
    <Layouts>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${
              import.meta.env.VITE_API_URL
            }/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width="350"
          />
        </div>
        <div className="col-md-6 ">
            <h1 className="text-center">Product Details</h1>
            <h6> Name : { product.name }</h6>
            <h6> Description : { product.description }</h6>
            <h6> Price : { product.price }</h6>
            <h6> Category : { product.category?.name }</h6>
            <button className="btn btn-warning ms-1">ADD To CART</button>
        </div>
      </div>
      <hr />

      <div className="row container">
        <h6>Similar products</h6>
        {relatedProducts.length < 1 && (<p className="text-center">No Similar Products found</p>)}
        <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">₹{p.price}</p>
                  <button className="btn btn-primary ms-1" 
                  onClick={()=>navigate(`/product/${p.slug}`)}
                  >See Details</button>
                  <button className="btn btn-secondary ms-1">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
      </div>
    </Layouts>
  );
};

export default ProductDetails;
