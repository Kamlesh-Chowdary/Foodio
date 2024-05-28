import axiosInstance from "../helper/axiosInstance";

export class ReservationService {
  createReservation = async (
    customerId,
    { date, time, members, occation, reservationStatus }
  ) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };
      const response = await axiosInstance.post(
        "/reservations/create-reservation",
        {
          date,
          time,
          customerId,
          members,
          occation,
          reservationStatus,
        },
        config
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error while creating reservation :: createReservation",
        error.response.data.message
      );
      throw error.response.data.message;
    }
  };

  getSingleReservation = async (reservationId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };
      const response = await axiosInstance.get(
        `/reservations/single-reservation/${reservationId}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error while getting single reservation detail :: getSingleReservation",
        error.response.data.message
      );
      throw error.response.data.message;
    }
  };

  editReservation = async (reservationId, { date, time, occation }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };
      const response = await axiosInstance.patch(
        `/reservations/edit-reservation/${reservationId}`,
        {
          date,
          time,
          occation,
        },
        config
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error while editing reservation details :: editReservation",
        error.response.data.message
      );
      throw error.response.data.message;
    }
  };

  cancelReservation = async (reservationId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };
      const response = await axiosInstance.get(
        `/reservations/cancel-reservation/${reservationId}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error while canceling reservation :: cancelReservation",
        error.response.data.message
      );
      throw error.response.data.message;
    }
  };

  getReservations = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };
      const response = await axiosInstance.get(
        "/reservations/all-reservations",
        config
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error while fetching all reservations :: getReservations",
        error.response.data.message
      );
      throw error.response.data.message;
    }
  };
}

const reservationService = new ReservationService();

export default reservationService;
