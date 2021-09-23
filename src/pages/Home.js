import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  // GRABBING DB ACCOUNT VALUE DATA TO SET INTO TABLE
  useEffect(() => {
    fireDb.child("account").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, []);

  // CHECKING BEFORE DELETION OF AN ACCOUNT
  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete Account?")) {
      fireDb.child(`account/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Account has been Deleted Successfully");
        }
      });
    }
  };

  const handleChange = (e) => {
    setSort(true);
    fireDb
      .child("account")
      .orderByChild(`${e.target.value}`)
      .on("value", (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
          setSortedData(sortedData);
        });
      });
  };

  const handleReset = () => {
    setSort(false);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Company Info</th>
            <th style={{ textAlign: "center" }}>Key Contact</th>
            <th style={{ textAlign: "center" }}>Financial Performance</th>
            {!sort && <th style={{ textAlign: "center" }}>Action</th>}
          </tr>
        </thead>
        {!sort && (
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
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>

                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}

        {sort && (
          <tbody>
            {sortedData.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                  <td>{item.companyInfo}</td>
                  <td>{item.keyContact}</td>
                  <td>{item.financialPerformance}</td>
                </tr>
              );
            })}
          </tbody>
        )}

        <label>Sort By: </label>
        <select className="dropdown" nam="colValue" onChange={handleChange}>
          <option>Please Select</option>
          <option value="name">Name</option>
          <option value="status">Status</option>
          <option value="keyContact">Contact</option>
          <option value="financialPerformance">Financial Performance</option>
        </select>
        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>
        <br />
      </table>
    </div>
  );
};

export default Home;
