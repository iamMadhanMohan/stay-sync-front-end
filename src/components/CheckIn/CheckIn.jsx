import React, { useState, useEffect } from "react";
import StaySyncService from "../../service/StaySyncService.js";

const CheckIn = () => {
  const [todayDate, setTodayDate] = useState("");
  const [tommorowDate, setTommorowDate] = useState("");
  const [roomNumbers, setRoomNumbers] = useState([]);

  const [data, setData] = useState({
    guestFirstName: "",
    guestLastName: "",
    guestDateOfBirth: "",
    guestCheckinDate: "",
    guestCheckoutDate: "",
    guestRoomType: "single bed",
    guestRoomNumber: "",
    guestAmountPaid: parseFloat(0.0),
    guestTotalAmount: parseFloat(0.0),
  });

  useEffect(() => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let tmr_dd = String(today.getDate() + 1).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let datePattern = `${yyyy}-${mm}-${dd}`;
    let datePattern2 = `${yyyy}-${mm}-${tmr_dd}`;

    setTodayDate(datePattern);
    setData({ ...data, guestCheckinDate: datePattern });
    setTommorowDate(datePattern2);

    StaySyncService.getAvailableRoomNumbers()
      .then((res) => {
        setRoomNumbers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChange(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    StaySyncService.saveGuest({
      ...data,
      guestAmountBalance: parseFloat(
        (data.guestTotalAmount - data.guestAmountPaid).toFixed(2)
      ),
      guestAmountPaid: parseFloat(data.guestAmountPaid),
      guestTotalAmount: parseFloat(data.guestTotalAmount),
      guestRoomNumber: parseInt(data.guestRoomNumber),
    })
      .then()
      .catch((err) => console.log(err));

    setData({
      guestFirstName: "",
      guestLastName: "",
      guestDateOfBirth: "",
      guestCheckinDate: "",
      guestCheckoutDate: "",
      guestRoomType: "single bed",
      guestRoomNumber: "",
      guestAmountPaid: parseFloat(0.0),
      guestTotalAmount: parseFloat(0.0),
    });
  }

  return (
    <div>
      <form action="" className="row p-5" onSubmit={handleSubmit}>
        <div className="d-flex flex-column col-12 col-sm-6 col-lg-4">
          <label htmlFor="first_name" className="mt-2 mt-lg-4">
            First Name
          </label>
          <input
            type="text"
            name="guestFirstName"
            id="first_name"
            value={data.guestFirstName}
            onChange={handleChange}
            required
          />
          <label htmlFor="last_name" className="mt-2 mt-lg-4">
            Last Name
          </label>
          <input
            type="text"
            name="guestLastName"
            id="last_name"
            value={data.guestLastName}
            onChange={handleChange}
            required
          />
          <label htmlFor="date_of_birth" className="mt-2 mt-lg-4">
            Date of Birth
          </label>
          <input
            type="date"
            name="guestDateOfBirth"
            id="date_of_birth"
            value={data.guestDateOfBirth}
            onChange={handleChange}
            required
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
            value={todayDate}
            min={todayDate}
            max={todayDate}
            onChange={handleChange}
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
            min={tommorowDate}
            required
          />
          <label htmlFor="room_type" className="mt-2 mt-lg-4">
            Room Type
          </label>
          <select
            className="form-select"
            name="guestRoomType"
            id="room_type"
            aria-label="Default select example"
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
            required
          />
          <label htmlFor="amount_balance" className="mt-2 mt-lg-4">
            Balance Amount
          </label>
          <input
            type="text"
            name="guestAmountBalance"
            id="amount_balance"
            value={(
              parseFloat(data.guestTotalAmount) -
              parseFloat(data.guestAmountPaid)
            ).toFixed(2)}
            onChange={handleChange}
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
            required
          />
        </div>

        <button className="btn w-25 m-auto mt-3 btn-primary">Checkin</button>
      </form>
    </div>
  );
};

export default CheckIn;
