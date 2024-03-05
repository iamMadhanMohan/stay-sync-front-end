import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StaySyncService from "../../service/StaySyncService.js";

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({ ...location.state });
  const [guest, setGuest] = useState(data.guest);

  const [todayDate, setTodayDate] = useState("");
  const [roomNumbers, setRoomNumbers] = useState([]);

  useEffect(() => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let datePattern = `${yyyy}-${mm}-${dd}`;

    setTodayDate(datePattern);

    StaySyncService.getAvailableRoomNumbers()
      .then((res) => {
        setRoomNumbers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [readonly] = useState(
    data.action === "view" || data.action === "checkout" ? true : false
  );

  function handleChange(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  function handleChange2(event) {
    setGuest({ ...guest, [event.target.name]: event.target.value });
  }

  function handleButtonClick(action) {
    delete data.action;
    delete data.isCheckout;
    delete data.guest;

    if (action == "edit") {
      StaySyncService.updateGuestInfo({ ...data, ...guest })
        .then()
        .catch((err) => console.log(err));
    } else {
      StaySyncService.checkoutGuest(data.guestStayId)
        .then()
        .catch((err) => console.log(err));
    }
    navigate("/ledge");
  }

  return (
    <div className="row p-5">
      <div className="d-flex flex-column col-12 col-sm-6 col-lg-4">
        <label htmlFor="first_name" className="mt-2 mt-lg-4">
          First Name
        </label>
        <input
          type="text"
          name="guestFirstName"
          id="first_name"
          value={guest.guestFirstName}
          onChange={handleChange2}
          readOnly={readonly}
        />
        <label htmlFor="last_name" className="mt-2 mt-lg-4">
          Last Name
        </label>
        <input
          type="text"
          name="guestLastName"
          id="last_name"
          value={guest.guestLastName}
          onChange={handleChange2}
          readOnly={readonly}
        />
        <label htmlFor="date_of_birth" className="mt-2 mt-lg-4">
          Date of Birth
        </label>
        <input
          type="date"
          name="guestDateOfBirth"
          id="date_of_birth"
          value={guest.guestDateOfBirth}
          onChange={handleChange2}
          readOnly={readonly}
        />
      </div>
      <div className="d-flex flex-column col-12 col-sm-6 col-lg-4">
        <label htmlFor="checkin_date" className="mt-2 mt-lg-4">
          Check-In
        </label>
        <input
          type="date"
          name="guestCheckinDate"
          id="checkin_date"
          value={data.guestCheckinDate}
          onChange={handleChange}
          readOnly={readonly}
          min={data.guestCheckinDate}
          max={data.guestCheckinDate}
        />
        <label htmlFor="checkout_date" className="mt-2 mt-lg-4">
          Check-Out
        </label>
        <input
          type="date"
          name="guestCheckoutDate"
          id="checkout_date"
          value={data.guestCheckoutDate}
          onChange={handleChange}
          min={todayDate}
          readOnly={readonly}
        />
        <label htmlFor="room_type" className="mt-2 mt-lg-4">
          Room Type
        </label>
        <select
          className="form-select"
          name="guestRoomType"
          id="room_type"
          aria-label="Default select example"
          disabled={readonly}
          value={data.guestRoomType}
          onChange={handleChange}
        >
          <option value="single bed">Single bed</option>
          <option value="double bed">Double bed</option>
          <option value="triple bed">Triple bed</option>
        </select>
        <label htmlFor="room_number" className="mt-2 mt-lg-4">
          Room Number
        </label>
        <select
          className="form-select"
          name="guestRoomNumber"
          id="room_number"
          aria-label="Default select example"
          value={data.guestRoomNumber}
          onChange={handleChange}
          disabled={readonly}
        >
          {roomNumbers
            .filter(
              (item) =>
                item.roomType === data.guestRoomType &&
                item.isOccupied === false
            )
            .map((item) => (
              <option key={item.roomNumber} value={item.roomNumber}>
                {item.roomNumber}
              </option>
            ))}
          <option value={data.guestRoomNumber}>{data.guestRoomNumber}</option>
        </select>
      </div>
      <div className="d-flex flex-column col-12 col-sm-6 col-lg-4">
        <label htmlFor="amount_paid" className="mt-2 mt-lg-4">
          Paid Amount
        </label>
        <input
          type="text"
          name="guestAmountPaid"
          id="amount_paid"
          value={data.guestAmountPaid}
          onChange={handleChange}
          readOnly={readonly}
        />
        <label htmlFor="amount_balance" className="mt-2 mt-lg-4">
          Balance Amount
        </label>
        <input
          type="text"
          name="guestAmountBalance"
          id="amount_balance"
          value={data.guestAmountBalance}
          onChange={handleChange}
          disabled={true}
        />
        <label htmlFor="total_amount" className="mt-2 mt-lg-4">
          Total Amount
        </label>
        <input
          type="text"
          name="guestTotalAmount"
          id="total_amount"
          value={data.guestTotalAmount}
          onChange={handleChange}
          readOnly={readonly}
        />
      </div>
      {data.action !== "view" && (
        <button
          className={
            data.action === "edit"
              ? "btn w-25 m-auto mt-3 btn-primary"
              : "btn w-25 m-auto mt-3 btn-danger"
          }
          onClick={() => handleButtonClick(data.action)}
        >
          {data.action === "edit" ? "Update" : "Checkout"}
        </button>
      )}
    </div>
  );
};

export default Review;
