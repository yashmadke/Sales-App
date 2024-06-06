import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../store/auth";
import { API_URL } from "../config/config";

function AddEntry() {
  // accessing authentication token from AuthContext
  const { token } = useContext(AuthContext);

  // state variables for loading state and form data
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    productname: "",
    quantity: "",
    amount: "",
  });

  const navigate = useNavigate();

  // function to add sales entry
  const addSales = async () => {
    setLoading(true);

    try {
      // sending POST request to add sales entry
      const response = await axios.post(
        `${API_URL}/api/sales/addSales`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`, // attaching authorization token to request headers
          },
        }
      );

      setLoading(false);

      toast.success(response.data.Message, {
        autoClose: 1000,
        position: "top-center",
      });

      setTimeout(() => {
        navigate("/topsales");
      }, 1500);
    } catch (error) {
      toast.warn(error.response.data.Error);

      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="container">
      {/* form for adding sales entry */}
      <div className="text-center">
        <h2 className="fw-bold my-4 d-inline-flex border-bottom border-info border-3 rounded px-3 pb-1">
          Add Sales Entry
        </h2>
      </div>

      <div className="mb-4">
        {/* input field for product name */}
        <label
          htmlFor="productname"
          className="form-label text-info fw-semibold"
        >
          Product Name
        </label>
        <input
          type="text"
          className="form-control border-info"
          id="productname"
          placeholder="Laptop..!"
          value={product.productname}
          onChange={(e) =>
            setProduct({ ...product, productname: e.target.value })
          }
        />
      </div>

      <div className="mb-4">
        {/* input field for quantity */}
        <label htmlFor="quantity" className="form-label text-info fw-semibold">
          Quantity
        </label>
        <input
          type="number"
          className="form-control border-info"
          id="quantity"
          placeholder="100"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
        />
      </div>

      <div className="mb-4">
        {/* input field for amount */}
        <label htmlFor="amount" className="form-label text-info fw-semibold">
          Amount
        </label>
        <input
          type="number"
          className="form-control border-info"
          id="amount"
          placeholder="120"
          value={product.amount}
          onChange={(e) => setProduct({ ...product, amount: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="mt-2 btn bg-info bg-opacity-10 border border-2 rounded border-info text-info fw-bold mb-3 w-100"
        onClick={(e) => {
          e.preventDefault();
          addSales();
        }}
      >
        {/* conditional rendering of button text based on loading state */}
        {loading ? (
          <span>
            <span
              className="spinner-border spinner-border-sm me-2"
              aria-hidden="true"
            ></span>
            <span role="status">Loading...</span>
          </span>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
}

export default AddEntry;
