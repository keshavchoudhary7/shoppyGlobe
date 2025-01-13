import React from 'react'
import { useEffect, useState } from 'react'
import Layouts from '../components/layout/Layouts'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
const categoryProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    
    useEffect(() => {
        if(params?.slug) getProductByCateg()
    }, [params?.slug])
    const getProductByCateg = async ()=>{
        try {
            const {data} = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/product/product-category/${params.slug}`
            )
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layouts>
        <div className="container mt-3">
            <h4 className='text-center'>Category - {category.name}</h4>
            <h6 className='text-center'>{products.length} results found</h6>
            <div className="row">
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
                  <button className="btn btn-secondary ms-1">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
            </div>
        </div>
    </Layouts>
  )
}

export default categoryProduct;