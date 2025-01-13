import React from "react";
import { Link } from "react-router-dom";
import useCategories from "../hooks/useCategory";
import Layouts from "../components/layout/Layouts";
const Categories = () => {
  const categories = useCategories();
  return (
    <Layouts title={"All categories"}>
      <div className="container">
        <div className="row">
          {categories.map((c) => {
            
    return <div key={c._id} className="col-md-6 mt-5 mb-3 gx-3 gy3">
                <Link className="btn btn-primary" to={`/category/${c.slug}`}>{c.name}</Link>
            </div>;
          })}
        </div>
      </div>
    </Layouts>
  );
};

export default Categories;
