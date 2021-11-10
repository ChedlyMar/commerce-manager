import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import "./ProductDetails.css";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/product/${id}`);

        setProduct(data.product);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [id]);

  const deleteHandler = async () => {
    const deletedProduct = { ...product, qte: 0 };

    try {
      await axios.patch(`http://localhost:5000/product/${id}`, deletedProduct);

      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const goBackHandler = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Product Details</h1>
      {product && (
        <div className="product-details">
          <div className="content-group">
            <label className="pre-content">Name:</label>
            <label className="content">{product.name}</label>
          </div>
          <div className="content-group">
            <label className="pre-content">Qte:</label>
            <label className="content">{product.qte}</label>
          </div>
          <div className="content-group">
            <label className="pre-content">Price:</label>
            <label className="content">{product.price}</label>
          </div>
        </div>
      )}
      <div>
        <button onClick={goBackHandler} className="btn-edit">
          Back
        </button>
        <button onClick={deleteHandler} className="btn-edit">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
