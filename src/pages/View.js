import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import { useParams, Link } from "react-router-dom";
import "./View.css";

const View = () => {
  const [account, setAccount] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fireDb
      .child(`account/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setAccount({ ...snapshot.val() });
        } else {
          setAccount({});
        }
      });
  }, [id]);

  console.log("account", account);
  return (
    <div style={{ marginTop: "50px" }}>
      <div className="card">
        <div className="card-header">
          <p>Account Details</p>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <span> {id}</span>
          <br />
          <br />
          <strong>Name: </strong>
          <span> {account.name}</span>
          <br />
          <br />
          <strong>Company Info: </strong>
          <span> {account.companyInfo}</span>
          <br />
          <br />
          <strong>Account Contact: </strong>
          <span> {account.keyContact}</span>
          <br />
          <br />
          <strong>Financial Performance: </strong>
          <span> {account.financialPerformance}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
