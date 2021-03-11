import React from "react";

const RightSideBar = () => (
  <nav id="sidebar">
    <div className="sidebar-header">
      <ul className="list-unstyled components">
        <h6 style={{ color: "green" }}> YOUR TOTAL BALANCE</h6>
        <li className="active">
          <h6 style={{ color: "red" }}> You Owe</h6>
          <h3 style={{ color: "red" }}>USD 0.0</h3>
        </li>
        <li className="active">
          <h6 style={{ color: "green" }}> You are Owed</h6>
          <h3 style={{ color: "green" }}>USD 0.0</h3>
        </li>
      </ul>
    </div>
  </nav>
);
export default RightSideBar;
