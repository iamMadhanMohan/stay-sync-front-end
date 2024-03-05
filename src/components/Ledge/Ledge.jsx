import { React, useEffect, useState } from "react";
import Paging from "../Paging";
import { useNavigate } from "react-router-dom";

import StaySyncService from "../../service/StaySyncService";

const Ledge = () => {
  const [data, setData] = useState([]);
  const [curentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("occupiedrooms");

  const tableHead = [
    "First name",
    "Last name",
    "Room number",
    "Room type",
    "Checkout date",
    "Amount paid",
    "Amount Balance",
    "Action",
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      try {
        const response = await StaySyncService.getLedgeRooms(activeButton);
        setData(response.data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [activeButton]);

  const navigation = useNavigate();

  function handleClick(item, actionValue) {
    navigation("/review", { state: { ...item, action: actionValue } });
  }

  function handleButtonClick(buttonText) {
    setActiveButton(buttonText);
  }

  // current page
  const indexOfLastRow = curentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  // changing to onclick page number in paging component
  function pagingTo(number) {
    setCurrentPage(number);
  }

  return (
    <div className="m-1 m-lg-3">
      {loading ? (
        <>
          <div className="mb-3">
            <button
              type="button"
              className={
                activeButton == "occupiedrooms"
                  ? "btn btn-primary text-light rounded-5 m-1 me-lg-3"
                  : "btn btn-outline-primary rounded-5 m-1 me-lg-3"
              }
              onClick={() => handleButtonClick("occupiedrooms")}
            >
              <small>Occupied Rooms</small>
            </button>
            <button
              type="button"
              className={
                activeButton == "checkoutrooms"
                  ? "btn btn-primary text-light rounded-5 m-1 me-lg-3"
                  : "btn btn-outline-primary rounded-5 m-1 me-lg-3"
              }
              onClick={() => handleButtonClick("checkoutrooms")}
            >
              <small>Checkout Rooms</small>
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-hover rounded-3">
              <thead className="text-center">
                <tr>
                  {tableHead.map((item, index) => (
                    <th
                      key={index}
                      scope="col"
                      style={{ backgroundColor: "#f7f9fc" }}
                      className="fw-normal"
                    >
                      <small>{item}</small>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-center">
                {currentData.map((item, index) => (
                  <tr key={index} className="fs-6 text-light fw-light">
                    <td scope="row">
                      <small>{item.guest.guestFirstName}</small>
                    </td>
                    <td>
                      <small>{item.guest.guestLastName}</small>
                    </td>
                    <td>
                      <small>{item.guestRoomNumber}</small>
                    </td>
                    <td>
                      <small>{item.guestRoomType}</small>
                    </td>
                    <td>
                      <small>{item.guestCheckoutDate}</small>
                    </td>
                    <td>
                      <small>{item.guestAmountPaid}</small>
                    </td>
                    <td>
                      <small>{item.guestAmountBalance}</small>
                    </td>
                    <td>
                      <small>
                        <button
                          type="button"
                          className="btn btn-success btn-sm me-2 mb-2 mb-lg-0"
                          onClick={() => handleClick(item, "view")}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-2 mb-2 mb-lg-0"
                          onClick={() => handleClick(item, "edit")}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleClick(item, "checkout")}
                        >
                          Checkout
                        </button>
                      </small>
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Paging
            dataLength={data.length}
            pageSize={rowsPerPage}
            pagingTo={pagingTo}
          />
        </>
      ) : (
        <div className="text-center my-5 text-danger">
          <h4>Cannot fetch data from server</h4>
        </div>
      )}
    </div>
  );
};

export default Ledge;
