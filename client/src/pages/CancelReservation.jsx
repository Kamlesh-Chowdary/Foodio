import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Status, Button } from "../components";
import { Calendar, Clock, UserRound, X, MoveLeft } from "lucide-react";
import moment from "moment";
import reservationService from "../services/reservation.service";
import { useState } from "react";
const CancelReservation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservationDetails = location.state?.data;
  const date = moment(reservationDetails.date);
  const formattedDate = date.format("dddd, Do MMMM YYYY");
  const { reservationId } = useParams();
  const [error, setError] = useState("");
  const handleCancel = async () => {
    setError("");
    try {
      const response = await reservationService.cancelReservation(
        reservationId
      );
      if (response.success) {
        navigate("/reservation");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <section className="lg:w-5/6 mx-auto  my-16 ">
      <Status status={false} reservationId={reservationDetails._id} />
      {error && (
        <p
          className=" text-xl text-center font-semibold text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
      <section className="md:flex justify-between items-center mt-10">
        <div className="bg-[#d0ccc719] p-8 rounded-full w-full md:w-1/3 ">
          <div className="bg-[#d0ccc733]  p-8 rounded-full ">
            <img
              src="/images/img_confirm_page.png"
              alt="Restaurant"
              className="py-auto"
            />
          </div>
        </div>
        <div className="mt-5">
          <h1 className="text-3xl py-3 font-bold text-[#301E08]">
            Reservation Details
          </h1>
          <div className="flex justify-start gap-5 items-center py-1 text-[#311F09]">
            <Calendar size={34} />
            <p className="text-xl py-2 font-medium text-[#5C4529] ">
              {formattedDate}
            </p>
          </div>
          <div className="flex justify-start gap-5 items-center py-1  text-[#311F09]">
            <Clock size={34} />
            <p className="text-xl py-2 font-medium text-[#5C4529]">
              {reservationDetails.time}
            </p>
          </div>
          <div className="flex justify-start gap-5 items-center py-1 text-[#311F09]">
            <UserRound size={34} />
            <p className="text-xl py-2 font-medium text-[#5C4529]">
              {reservationDetails.members}
            </p>
          </div>
        </div>
        <div className="flex md:flex-col justify-between mt-10">
          <Button
            className="flex font-semibold px-10 mb-5 py-5 rounded-2xl  text-xl gap-3 items-center"
            onClick={handleCancel}
          >
            Cancel <X size={34} />
          </Button>
          <Button
            bgColor="bg-white"
            textColor="text-[#4A1F09]"
            className="flex font-semibold px-10 mb-5 py-5 rounded-2xl  text-xl gap-3 items-center"
            onClick={() => navigate("/reservation")}
          >
            Go Back <MoveLeft size={34} />
          </Button>
        </div>
      </section>
    </section>
  );
};

export default CancelReservation;
