import React from "react";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "white",
        height: "30px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Link to={"/"}>
        <h2>Home</h2>
      </Link>
    </div>
  );
};

export default Header;
