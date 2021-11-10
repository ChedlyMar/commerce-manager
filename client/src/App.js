import { Routes, Route, Navigate } from "react-router-dom";

import AddProduct from "./components/AddProduct/AddProduct";
import EditProduct from "./components/EditProduct/EditProduct";
import ProductDetails from "./components/ProductDetals/ProductDetails";
import ProductList from "./components/ProductList/ProductList";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Commerce Manager</h1>
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/products" />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<AddProduct />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
