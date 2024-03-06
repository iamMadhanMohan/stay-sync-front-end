import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Paging from "../Paging";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import StaySyncService from "../../service/StaySyncService.js";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AllGuests = () => {
  const [data, setData] = useState([]);
  const [curentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [allGuestData, setAllGuestData] = useState([]);

  function handleChange(event) {
    if (event.target.value == "") {
      setData(allGuestData);
    } else {
      setData(
        allGuestData.filter((item) =>
          item.guest.guestFirstName.includes(event.target.value)
        )
      );
    }
  }

  const tableHead = [
    "First name",
    "Last name",
    "Room number",
    "Room type",
    "Checkin date",
    "Amount paid",
    "Amount Balance",
    "Action",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StaySyncService.getAllGuests();
        setAllGuestData(response.data);
        setData(response.data);
        setLoading(true);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const navigation = useNavigate();

  function handleClick(item) {
    navigation("/review", { state: { ...item, action: "view" } });
  }

  function handleFilter(msg) {
    if (msg == "all") {
      setData(allGuestData);
    } else if (msg == "atoz") {
      let arrayOfObjects = [...allGuestData];

      arrayOfObjects.sort((a, b) => {
        const nameA = a.guest.guestFirstName.toUpperCase();
        const nameB = b.guest.guestFirstName.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setData(arrayOfObjects);
    } else if (msg == "latest") {
      let arrayOfObjects = [...allGuestData];

      arrayOfObjects.sort((a, b) => {
        const nameA = a.guestCheckinDate;
        const nameB = b.guestCheckinDate;

        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
      setData(arrayOfObjects);
    } else if (msg == "room number") {
      let arrayOfObjects = [...allGuestData];

      arrayOfObjects.sort((a, b) => {
        const nameA = a.guestRoomNumber;
        const nameB = b.guestRoomNumber;

        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
      setData(arrayOfObjects);
    } else if (msg == "single bed") {
      setData(
        allGuestData.filter((item) => item.guestRoomType == "single bed")
      );
    } else if (msg == "double bed") {
      setData(
        allGuestData.filter((item) => item.guestRoomType == "double bed")
      );
    } else if (msg == "triple bed") {
      setData(
        allGuestData.filter((item) => item.guestRoomType == "triple bed")
      );
    }
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
          <div className="d-sm-flex gap-5">
            <DropdownButton
              id="dropdown-item-button"
              title="Filter by"
              className="mb-3"
            >
              <Dropdown.Item as="button" onClick={() => handleFilter("all")}>
                All
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => handleFilter("atoz")}>
                A-Z
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => handleFilter("latest")}>
                Latest
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={() => handleFilter("room number")}
              >
                Room Number
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={() => handleFilter("single bed")}
              >
                Single bed
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={() => handleFilter("double bed")}
              >
                Double bed
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={() => handleFilter("triple bed")}
              >
                Triple bed
              </Dropdown.Item>
            </DropdownButton>
            <Form>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="first name"
                    className=" mr-sm-2"
                    onChange={handleChange}
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit" className="my-3 my-sm-0">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
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
                      <small>{item.guestCheckinDate}</small>
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
                          onClick={() => handleClick(item)}
                        >
                          View
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

export default AllGuests;
