import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const auth = localStorage.getItem('user');
  function logout() {
    localStorage.clear();
    // navigate('/signup');
  }
  if (!auth) {
    var Class = "nav-ul2";
  }
  return (
    <div>
      <ul className="nav-ul">
        <li><img style={{ width: "60px", height: "60px", borderRadius: "50%" }} src="https://logo.com/image-cdn/images/kts928pd/production/135bcf0c7853ca7f91a2e625e4136580f062d679-416x429.png?w=1080&q=72" alt="logo" /></li>
        {auth ?
          <>
            <div style={{ alignSelf: "center" }}>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/">Product List</Link></li>
              <li><Link to="/addproduct">Add Product</Link></li>
              <li><Link to="/update">Update Product</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><b>{JSON.parse(auth).name}</b></li>
              <li style={{ position: "absolute", right: "10px" }}><Link onClick={logout} to="/login">Logout</Link></li>
            </div>
          </>
          :
          <>
            <div className={Class} >
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </div>
          </>
        }
      </ul>
    </div >
  );
}

