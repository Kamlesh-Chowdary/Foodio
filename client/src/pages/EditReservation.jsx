import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import reservationService from "../services/reservation.service";
import { ReservationComponent } from "../components";

const EditReservation = () => {
  const { reservationId } = useParams();

  const [reservationDetails, setReservationDetails] = useState([]);

  useEffect(() => {
    (async () => {
      if (reservationId) {
        const details = await reservationService.getSingleReservation(
          reservationId
        );
        if (details.success) {
          setReservationDetails(details.data);
        }
      }
    })();
  }, [reservationId]);

  return <ReservationComponent reservationDetails={reservationDetails[0]} />;
};

export default EditReservation;
