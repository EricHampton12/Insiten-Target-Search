import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  const [search, setSearch] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddAccount");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?name=${search}`);
    setSearch("");
  };

  return (
    <>
      <div className="header-container">
        <p className="logo">Insiten Acquisition Search</p>
        <div className="header-right">
          <Link to="/">
            <p
              className={`${activeTab === "Home"} ? "active" : ""`}
              onClick={() => setActiveTab("Home")}
            >
              Home
            </p>
          </Link>
          <Link to="/add">
            <p
              className={`${activeTab === "AddAccount"} ? "active" : ""`}
              onClick={() => setActiveTab("AddAccount")}
            >
              Add Account
            </p>
          </Link>
          <Link to="/about">
            <p
              className={`${activeTab === "About"} ? "active" : ""`}
              onClick={() => setActiveTab("About")}
            >
              About
            </p>
          </Link>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} style={{ display: "inline" }}>
          <input
            type="text"
            className="inputField"
            placeholder="Search Name..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
      </div>
    </>
  );
};

export default Header;
