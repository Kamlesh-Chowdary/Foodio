/* eslint-disable react/prop-types */
import { SquareCheck, CalendarCheck2 } from "lucide-react";

const Status = ({ status, orderId }) => {
  return (
    <>
      {status ? (
        <div className="bg-[url('/images/img_confirm.png')] bg-cover">
          <h1 className=" text-3xl md:text-5xl   text-white  font-semibold  pl-5 py-5 ">
            Order has been placed
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
            <p className="text-white font-medium">Booking ID : #{orderId}</p>
          </div>
        </div>
      ) : (
        <img src="images/img_cancel.jfif" alt="Order Cancel" />
      )}
    </>
  );
};

export default Status;
