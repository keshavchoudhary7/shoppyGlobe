import React, { useState, useEffect } from "react";
import Layouts from "../components/layout/Layouts";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
const Home = () => {
  const navigate = useNavigate();
  const [cart,setCart] = useCart([])
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/category/get-categories`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories!");
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Get products by page
  const getProductsByPage = async (currentPage = 1) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/products-list/${currentPage}`
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products!");
    }
  };

  // Fetch filtered or paginated products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/product-filter`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to filter products!");
    }
  };

  // Handle checkbox filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Handle page change
  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    getProductsByPage(page);
  }, [page]);

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getProductsByPage(page);
    } else {
      filterProduct();
    }
  }, [checked, radio]);

  return (
    <Layouts title={"All Products - Best Offers"}>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-3">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <button
            className="btn btn-danger mt-3"
            onClick={() => window.location.reload()}
          >
            Reset Filters
          </button>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
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
                  <button className="btn btn-secondary ms-1"
                    onClick={()=>{
                      const updatedCart = [...cart,p]
                      setCart(updatedCart)
                      localStorage.setItem('cart',JSON.stringify(updatedCart))
                    toast.success("Product added to cart!")}}
                  >
                    Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(total / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center mt-3"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </Layouts>
  );
};

export default Home;
