import { useContext } from "react";
import { AuthContext } from "../store/auth";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { token, setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <>
      {/* Navigation Bar  */}
      <nav className="navbar navbar-expand-lg fw-bold fs-6 bg-info bg-opacity-10 border-bottom border-2 border-info">
        <div className="container-fluid">
          <span className="navbar-brand">Sales App</span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-0 ms-md-5">
              {/* conditional rendering of links based on authentication  */}
              {token && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-info ms-lg-3 me-0 me-md-4"
                      to="/addEntry"
                    >
                      Add Sales
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-info me-0 me-md-4"
                      to="/topsales"
                    >
                      Top 5 Sales
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-info me-0 me-md-4"
                      to="/totalrevenue"
                    >
                      Total Revenue
                    </Link>
                  </li>
                </>
              )}

              {/* conditional rendering of links based on authentication  */}
              {!token && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-info me-0 me-md-4"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link text-info me-0 me-md-4"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}

              {/* conditional rendering of links based on authentication  */}
              {token && (
                <li className="nav-item">
                  {/* Deleting the sesionStorage on clicking log */}
                  <Link
                    className="nav-link text-info me-0 me-md-4"
                    to="/"
                    onClick={async () => {
                      await setToken(sessionStorage.removeItem("token"));
                      navigate("/");
                    }}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
