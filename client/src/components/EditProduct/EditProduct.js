import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import "./EditProduct.css";

const EditProduct = () => {
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

  const resetHandler = (e) => {
    e.preventDefault();
    setProduct({ name: "", qte: "", price: "" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:5000/product/${id}`, product);

      navigate("/");
    } catch (error) {
      console.error(error.message);
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
              <input
                name="name"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </div>
            <div className="input-group">
              <label>Qte:</label>
              <input
                name="qte"
                value={product.qte}
                onChange={(e) =>
                  setProduct({ ...product, qte: e.target.value })
                }
              />
            </div>
            <div className="input-group">
              <label>Price:</label>
              <input
                name="price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
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
