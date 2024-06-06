import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config";
import axios from "axios";
import { toast } from "react-toastify";

const Registration = () => {
  // state variable for registration form field and loding state
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // function to handle user registration
  const register = async () => {
    setLoading(true);

    try {
      // constructiong data object with user details
      const data = {
        firstname: firstname,
        lastname: lastname,
        email,
        password,
      };

      // sending post request to register endpoint
      const response = await axios.post(`${API_URL}/api/user/register`, data);

      // state loading state to false
      setLoading(false);

      toast.success(response.data.Message, {
        position: "top-center",
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setLoading(false);

      toast.warn(error.response.data.Error, {
        position: "top-center",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="container">
      {/* Registration Form */}
      <div className="text-center">
        <h2 className="fw-bold my-4 d-inline-flex border-bottom border-info border-3 rounded px-3 pb-1">
          Registration Form
        </h2>
      </div>

      <div className="mb-4">
        {/* input field for first name  */}
        <label htmlFor="firstName" className="form-label text-info fw-semibold">
          First Name
        </label>
        <input
          type="text"
          className="form-control border-info"
          id="firstName"
          placeholder="Sonam"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        {/* input field for last name  */}
        <label htmlFor="lastName" className="form-label text-info fw-semibold">
          Last Name
        </label>
        <input
          type="text"
          className="form-control border-info"
          id="lastname"
          placeholder="Soni"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        {/* input field for email  */}
        <label htmlFor="Email" className="form-label text-info fw-semibold">
          Email
        </label>
        <input
          type="email"
          className="form-control border-info"
          id="Email"
          placeholder="admin@internshala.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        {/* input field for password */}
        <label htmlFor="Password" className="form-label text-info fw-semibold">
          Password
        </label>
        <input
          type="password"
          className="form-control border-info"
          id="Password"
          placeholder="120#$Alphabets!"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* button for registration  */}
      <button
        type="submit"
        className="mt-2 btn bg-info bg-opacity-10 border border-2 rounded border-info text-info fw-bold mb-3 w-100"
        onClick={(e) => {
          e.preventDefault();
          register();
        }}
      >
        {/* conditional rendering of button text based on loading state  */}
        {loading ? (
          <span>
            <span
              className="spinner-border spinner-border-sm me-2"
              aria-hidden="true"
            ></span>
            <span role="status">Loading...</span>
          </span>
        ) : (
          "Register"
        )}
      </button>
    </div>
  );
};

export default Registration;
