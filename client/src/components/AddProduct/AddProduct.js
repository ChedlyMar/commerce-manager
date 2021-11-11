import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import "./AddProduct.css";
import { formValidation } from "../../validation/formValidation";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    qte: "",
    price: "",
  });

  const [productError, setProductError] = useState({
    nameErr: "",
    qteErr: "",
    priceErr: "",
  });

  const resetHandler = (e) => {
    e.preventDefault();
    setProduct({ name: "", qte: "", price: "" });
    setProductError({ nameErr: "", qteErr: "", priceErr: "" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const productFormValidation = formValidation(product);
    setProductError(productFormValidation.productError);

    if (productFormValidation.formIsValid) {
      try {
        await axios.post("http://localhost:5000/product", product);

        navigate("/");
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="container">
      <h1>New Product</h1>
      <form onSubmit={submitHandler} noValidate>
        <div>
          <div className="input-group">
            <label>Name:</label>
            <div className="input">
              <input
                type="text"
                name="name"
                value={product.name}
                min="3"
                required
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
              {productError.nameErr && <p>{productError.nameErr}</p>}
            </div>
          </div>
          <div className="input-group">
            <label>Qte:</label>
            <div className="input">
              <input
                type="number"
                min="0"
                name="qte"
                value={product.qte}
                onChange={(e) =>
                  setProduct({ ...product, qte: e.target.value })
                }
              />
              {productError.qteErr && <p>{productError.qteErr}</p>}
            </div>
          </div>
          <div className="input-group">
            <label>Price:</label>
            <div className="input">
              <span class="input-symbol-dollar">
                <input
                  type="number"
                  min="0"
                  name="price"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
              </span>
              {productError.priceErr && <p>{productError.priceErr}</p>}
            </div>
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
