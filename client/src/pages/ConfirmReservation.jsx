import { useLocation, useNavigate } from "react-router-dom";
import { Status, Button } from "../components";
import { Calendar, Clock, UserRound, X, SquarePen } from "lucide-react";
import moment from "moment";
const ConfirmReservation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservationDetails = location.state?.data;
  const date = moment(reservationDetails?.date);
  const formattedDate = date.format("dddd, Do MMMM YYYY");

  const handleModify = () => {
    navigate(`/edit/reservation/${reservationDetails._id}`);
  };

  return (
    <section className="lg:w-5/6 mx-auto  my-16">
      <Status status={true} reservationId={reservationDetails?._id} />
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
              {reservationDetails?.time}
            </p>
          </div>
          <div className="flex justify-start gap-5 items-center py-1 text-[#311F09]">
            <UserRound size={34} />
            <p className="text-xl py-2 font-medium text-[#5C4529]">
              {reservationDetails?.members}
            </p>
          </div>
        </div>
        <div className="flex md:flex-col justify-between mt-10">
          <Button
            bgColor="bg-[#CEE2FF]"
            textColor="text-[#123968]"
            className="flex font-semibold px-10 mb-5 py-5 rounded-2xl  text-xl gap-3 items-center"
            onClick={handleModify}
          >
            Modify <SquarePen size={30} />
          </Button>
          <Button
            bgColor="bg-[#FDE6E7]"
            textColor="text-[#EA1011]"
            className="flex font-semibold px-10 mb-5 py-5 rounded-2xl  text-xl gap-3 items-center"
            onClick={() =>
              navigate(`../cancel/${reservationDetails._id}`, {
                state: { data: reservationDetails },
              })
            }
          >
            Cancel <X size={30} />
          </Button>
        </div>
      </section>
    </section>
  );
};

export default ConfirmReservation;
