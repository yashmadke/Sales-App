import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./store/auth";
import Header from "./components/Header";
import NotFound from "./pages/Notfound";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import AddEntry from "./pages/AddEntry";
import TopSales from "./pages/TopSales";
import Revenue from "./pages/Revenue";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="App">
        {/* component for displaying toast messages  */}
        <ToastContainer />

        {/* component for displaying header  */}
        <Header />

        {/* routing setup for different different components  */}
        <Routes>
          {/* conditional rendering based on token existance */}
          {token ? (
            <>
              {/* routes accessible for authenticated users  */}
              <Route path="/addEntry" element={<AddEntry />}></Route>
              <Route path="/topsales" element={<TopSales />}></Route>
              <Route path="/totalrevenue" element={<Revenue />}></Route>
            </>
          ) : (
            <>
              {/* route for registration  */}
              <Route path="/register" element={<Registration />}></Route>
            </>
          )}

          {/* default route for unauthenticated users  */}
          <Route path="/" element={<Registration />} />

          {/* route for login  */}
          <Route path="/login" element={<Login />}></Route>

          {/* route for displaying not found page for unauthenticated users  */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
