import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import "./EditProduct.css";
import { formValidation } from "../../validation/formValidation";

const EditProduct = () => {
  const [product, setProduct] = useState();
  const [productError, setProductError] = useState({
    nameErr: "",
    qteErr: "",
    priceErr: "",
  });
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
        await axios.patch(`http://localhost:5000/product/${id}`, product);

        navigate("/");
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="container">
      <h1>Update Product</h1>
      <form onSubmit={submitHandler}>
        {product && (
          <div>
            <div className="input-group">
              <label>Name:</label>
              <div className="input">
                <input
                  name="name"
                  value={product.name}
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
                <span className="input-symbol-dollar">
                  <input
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
        )}
        <div className="btn-group">
          <button onClick={resetHandler} className="btn-edit">
            Reset
          </button>
          <button type="submit" className="btn-edit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
