import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

class StaySyncService {
  saveGuest(guestData) {
    return axios.post(API_BASE_URL + "/checkin", guestData);
  }

  getAllGuests() {
    return axios.get(API_BASE_URL + "/allguests");
  }

  getLedgeRooms(buttonText) {
    return axios.get(API_BASE_URL + "/" + buttonText);
  }

  updateGuestInfo(guestData) {
    return axios.put(API_BASE_URL + "/update", guestData);
  }

  checkoutGuest(guestId) {
    return axios.put(API_BASE_URL + "/checkout/" + guestId);
  }

  getAvailableRoomNumbers() {
    return axios.get(API_BASE_URL + "/getroomnumbers");
  }
}

export default new StaySyncService();
