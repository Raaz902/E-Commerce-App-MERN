import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";
import PrivateComponent from "./components/PrivateComponent";
import { useState } from "react";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";


function App() {
  const [update, setData] = useState();
  const auth = localStorage.getItem('user');
  function sendData2(data) {
    setData(data)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />} >
            <Route path="/" element={<ProductList sendData2={sendData2} />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product_details/:productId" element={<ProductDetail />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/update" element={update ? <UpdateProduct Update={update} /> : <UpdateProduct />} />
            <Route path="/cart/:productIds" element={<Cart />} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            <Route path="/profile" element={<h1>{/* {JSON.parse(auth).name}'s */} Mohammad Raaz</h1>} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
