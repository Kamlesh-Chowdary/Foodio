import { useLocation } from "react-router-dom";

const ConfirmReservation = () => {
  const location = useLocation();
  const params = location.state;
  return <>{params.date}</>;
};

export default ConfirmReservation;
