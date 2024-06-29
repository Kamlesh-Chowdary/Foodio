/* eslint-disable react/prop-types */
import { SquareCheck, CalendarCheck2 } from "lucide-react";

const Status = ({ status, orderId, reservationId }) => {
  return (
    <>
      {status ? (
        <div className="bg-[url('/images/img_confirm.png')] bg-cover lg:pl-5">
          <h1 className=" text-3xl md:text-5xl   text-white  font-semibold  pl-5 py-5 ">
            {reservationId
              ? "Reservation has been confirmed"
              : "Order has been placed"}
          </h1>

          <div className="pl-5 flex gap-3 items-center">
            <div className="bg-white/50 p-2 rounded-xl">
              <SquareCheck color="white" />
            </div>
            <p className="text-white font-medium">
              The confirmation result will been sent to your email
            </p>
          </div>
          <div className="pl-5 py-5 flex gap-3 items-center">
            <div className="bg-white/50 p-2 rounded-xl">
              <CalendarCheck2 color="white" />
            </div>
            <p className="text-white font-medium">
              Booking ID : #{reservationId ? reservationId : orderId}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-[url('/images/img_cancel.png')] bg-cover lg:pl-5">
          <h1 className=" text-3xl md:text-5xl   text-white  font-semibold  pl-5 py-5 ">
            {reservationId
              ? "Are you sure you want to cancel the reservation?"
              : "Are you sure you want to cancel the Order?"}
          </h1>

          <div className="pl-5 py-5 flex gap-3 items-center">
            <div className="bg-white/50 p-2 rounded-xl">
              <CalendarCheck2 color="white" />
            </div>
            <p className="text-white font-medium">
              Booking ID : #{reservationId ? reservationId : orderId}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Status;
