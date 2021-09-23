import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import fireDb from "../firebase";
import "./Search.css";

const Search = () => {
  const [data, setData] = useState({});

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let search = query.get("name");

  console.log("search", search);

  useEffect(() => {
    searchData();
  }, [search]);

  const searchData = () => {
    fireDb
      .child("account")
      .orderByChild("name")
      .equalTo(search)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  };

  return (
    <>
      <div className="home-container" style={{ marginTop: "50px" }}>
        {Object.keys(data).length === 0 ? (
          <h4>No Search Found with that Name : {query.get("name")}</h4>
        ) : (
          <table className="styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>No</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Company Info</th>
                <th style={{ textAlign: "center" }}>Key Contact</th>
                <th style={{ textAlign: "center" }}>Financial Performance</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((id, index) => {
                return (
                  <tr key={id}>
                    <th scope="row">{index + 1}</th>
                    <td>{data[id].name}</td>
                    <td>{data[id].status}</td>
                    <td>{data[id].companyInfo}</td>
                    <td>{data[id].keyContact}</td>
                    <td>{data[id].financialPerformance}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <Link to="/">
        <button className="btn btn-edit"> Go Back </button>
      </Link>
    </>
  );
};

export default Search;
