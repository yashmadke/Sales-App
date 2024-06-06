import axios from "axios";
import { API_URL } from "../config/config";
import { AuthContext } from "../store/auth";
import { useContext, useEffect, useState } from "react";

const TopSales = () => {
  const { token } = useContext(AuthContext);

  const [data, setData] = useState([]);

  const topSales = async () => {
    const topSalesData = await axios.get(`${API_URL}/api/sales/topSales`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setData(topSalesData.data.topSalesData);
  };

  // fetch topSalesData on component mount
  useEffect(() => {
    topSales();
  }, []);

  return (
    <div className="container">
      <div className="text-center">
        <h2 className="fw-bold my-4 d-inline-flex border-bottom border-info border-3 rounded px-3 pb-1">
          Top 5 Sales!
        </h2>
      </div>

      <div>
        <table className="table">
          <thead>
            <tr className="border-bottom border-info">
              <th scope="col" className=" text-info">
                #
              </th>
              <th scope="col" className=" text-info">
                Product Name
              </th>
              <th scope="col" className=" text-info">
                Quantity
              </th>
              <th scope="col" className=" text-info">
                Sale Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr className="border-bottom border-info" key={index}>
                <th scope="row" className=" text-info">
                  {index + 1}
                </th>
                <td>{item.productname}</td>
                <td>{item.quantity}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSales;
