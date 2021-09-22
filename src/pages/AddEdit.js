import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  status: "",
  companyInfo: "",
  keyContact: "",
  financialPerformance: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, status, companyInfo, keyContact, financialPerformance } = state;

  const history = useHistory();

  const { id } = useParams();

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
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }
    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !status ||
      !companyInfo ||
      !keyContact ||
      !financialPerformance
    ) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        fireDb.child("account").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Account added Successfully");
          }
        });
      } else {
        fireDb.child(`account/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Account Updated Successfully");
          }
        });
      }
      setTimeout(() => history.push("/"), 10);
    }
  };

  return (
    <div className="add-edit-container" style={{ marginTop: "50px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Account Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Account Name..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="status">Status</label>
        <input
          type="text"
          id="status"
          name="status"
          placeholder="Account Status..."
          value={status || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="companyInfo">Company Info</label>
        <input
          type="textarea"
          id="companyInfo"
          name="companyInfo"
          placeholder="Company Info..."
          value={companyInfo || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="keyContact">Contact Email</label>
        <input
          type="email"
          id="keyContact"
          name="keyContact"
          placeholder="Contact..."
          value={keyContact || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="financialPerformance">Financial Performance</label>
        <input
          type="text"
          id="financialPerformance"
          name="financialPerformance"
          placeholder="Financial Performance..."
          value={financialPerformance || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
