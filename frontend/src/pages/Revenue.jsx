import axios from "axios";
import { API_URL } from "../config/config";
import { AuthContext } from "../store/auth";
import { useContext, useEffect, useState } from "react";

const Revenue = () => {
  const [revenue, setRevenue] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  const getRevenue = async () => {
    setLoading(true);

    const response = await axios.get(`${API_URL}/api/sales/totalRevenue`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setRevenue(response.data.totalRevenue);

    setLoading(false);
  };

  useEffect(() => {
    getRevenue();
  }, []);

  return (
    <div>
      <div className="text-center">
        <h2 className="fw-bold my-4 d-inline-flex border-bottom border-info border-3 rounded px-3 pb-1">
          Today's Total Revenue Is &nbsp;
          {loading ? (
            <span className="spinner-grow spinner-grow-sm text-dark mt-2"></span>
          ) : (
            <>{revenue}</>
          )}
        </h2>
      </div>
    </div>
  );
};

export default Revenue;
