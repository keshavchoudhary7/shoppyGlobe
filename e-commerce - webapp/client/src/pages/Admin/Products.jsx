import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Make sure to import Link
import Layouts from "../../components/layout/Layouts";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";

const Products = () => {
    const [products, setProducts] = useState([]);

    // Get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/product/get-products`
            );
            if (data?.success) {
                setProducts(data.products); // Properly set the products state
            } else {
                toast.error("Failed to fetch products.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch products.");
        }
    };

    // Lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layouts>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Products List</h1>
                    <div className="d-flex flex-wrap">
                        {products.map((p) => (
                            <Link
                                key={p._id}
                                to={`/dashboard/admin/product/${p.slug}`}
                                className="product-link"
                            >
                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 50)}...</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layouts>
    );
};

export default Products;
