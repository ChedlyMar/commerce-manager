import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./ProductList.css";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const columns = ["Id", "Name", "Quantity", "Price", "Actions"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/product");

        setProductList(data.products);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="product-list-header">
        <h1>ProductList</h1>
        <Link to={`/products/new`} className="product-list-add">
          Add New Product
        </Link>
      </div>
      {productList.length && (
        <table>
          <thead>
            <tr>
              {columns.map((headerItem, index) => (
                <th key={index}>{headerItem}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.qte}</td>
                <td>{product.price}</td>
                <td className="btn-block">
                  <Link to={`/products/${product._id}/edit`} className="btn">
                    Edit
                  </Link>
                  <Link to={`/products/${product._id}`} className="btn">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
