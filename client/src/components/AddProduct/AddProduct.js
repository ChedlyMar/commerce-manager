import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import "./AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    qte: "",
    price: "",
  });

  const resetHandler = (e) => {
    e.preventDefault();
    setProduct({ name: "", qte: "", price: "" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/product", product);

      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container">
      <h1>New Product</h1>
      <form onSubmit={submitHandler}>
        <div>
          <div className="input-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              min="3"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Qte:</label>
            <input
              type="text"
              name="qte"
              value={product.qte}
              onChange={(e) => setProduct({ ...product, qte: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
          </div>
        </div>
        <div className="btn-group">
          <button onClick={resetHandler} className="btn-edit">
            Reset
          </button>
          <button type="submit" className="btn-edit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
