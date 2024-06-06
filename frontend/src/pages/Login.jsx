import { useContext, useState } from "react";
import { AuthContext } from "../store/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/config";
import { toast } from "react-toastify";

const Login = () => {
  // accessing authentication token and setToken function from AuthContext
  const { setToken } = useContext(AuthContext);

  //   state variable for user crediantials, loading state and navigation
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //   function to handle user login
  const login = async () => {
    setLoading(true);

    try {
      // sending post request to login endpoint
      const response = await axios.post(`${API_URL}/api/user/login`, user);

      toast.success(response.data.Message, {
        position: "top-center",
        autoClose: 2000,
      });

      // storing token to sessionStorage and updating token state
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      setToken(JSON.parse(sessionStorage.getItem("token")));

      // set loading state to false
      setLoading(false);

      setTimeout(() => {
        navigate("/addEntry");
      }, 2500);
    } catch (error) {
      setLoading(false);

      toast.warn(error.response.data.Error, {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container">
      {/* Login Form  */}
      <div className="text-center">
        <h2 className="fw-bold my-4 d-inline-flex border-bottom border-info border-3 rounded px-3 pb-1">
          Log-in Form
        </h2>
      </div>

      <div className="mb-4">
        {/* input field for email */}
        <label
          htmlFor="exampleFormControlInput"
          className="form-label text-info fw-semibold"
        >
          E-mail
        </label>
        <input
          type="email"
          className="form-control border-info"
          id="exampleFormControlInput"
          placeholder="admin@internshala.com"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>

      <div className="mb-4">
        {/* input field for password */}
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label text-info fw-semibold"
        >
          Password
        </label>
        <input
          type="password"
          className="form-control border-info"
          id="exampleFormControlInput1"
          placeholder="123#Alphabet"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>

      {/* button for login */}
      <button
        type="submit"
        className="mt-2 btn bg-info bg-opacity-10 border border-2 rounded border-info text-info fw-bold mb-3 w-100"
        onClick={(e) => {
          e.preventDefault();
          login();
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
          "Log-In"
        )}
      </button>
    </div>
  );
};

export default Login;
