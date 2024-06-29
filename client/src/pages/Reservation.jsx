import { useState } from "react";
import {
  Container,
  Button,
  Input,
  Select,
  Reservation_Details,
} from "../components/index";
import { useForm } from "react-hook-form";
import moment from "moment";
import { Outlet, useLocation } from "react-router-dom";

const Reservation = () => {
  const location = useLocation();
  const isConfirmPage = location.pathname === "/reservation/confirm";
  const isCancelPage = location.pathname.startsWith("/reservation/cancel");
  const shouldRenderForm = !isConfirmPage && !isCancelPage;

  const minDate = moment().format("YYYY-MM-DD");
  const maxDate = moment().add(18, "days").format("YYYY-MM-DD");
  const [showEnterDetailsForm, setShowEnterDetailsForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: minDate,
      time: "20:30",
    },
  });
  const [reservationDetails, setReservationDetails] = useState({});

  const handleDetails = (data) => {
    setShowEnterDetailsForm(!showEnterDetailsForm);
    setReservationDetails(data);
  };

  return (
    <Container>
      {shouldRenderForm && (
        <section className=" h-full lg:h-screen md:grid grid-cols-2 md:py-6 gap-16 lg:w-5/6 pt-5 m-auto">
          <img
            src="/images/img_reservation.png"
            alt="Hero Image"
            className="w-11/12 m-auto my-5"
          />

          <form onSubmit={handleSubmit(handleDetails)}>
            <h1 className="text-5xl md:text-7xl text-center  font-bold text-[#301E08] my-5">
              Book a table
            </h1>
            <Input
              type="date"
              min={minDate}
              max={maxDate}
              className="lg:my-6"
              {...register("date", { required: true })}
            />
            {errors.date && (
              <span className="font-semibold  text-primary">
                *Date is required
              </span>
            )}
            <Input
              type="time"
              min="10:00"
              max="24:00"
              className="lg:my-6"
              {...register("time", { required: true })}
            />
            {errors.time && (
              <span className="font-semibold  text-center text-primary">
                *Time is required
              </span>
            )}

            <Select
              className="lg:my-6"
              options={[
                "Solo Seat (1)",
                "Intimate Table (2)",
                "Cozy Corner (2-4)",
                "Family Table (4-6)",
                "Group Booth (6-8)",
                "Celebration Table (8-10)",
              ]}
              {...register("members", { required: true })}
            />

            <Button
              type="submit"
              className="font-semibold my-3  lg:my-6 px-10 py-5 rounded-2xl w-full text-xl "
            >
              Book now
            </Button>
          </form>
          {showEnterDetailsForm && (
            <>
              <div className="fixed top-0 left-0 w-full h-full opacity-50 z-10 bg-black/80" />
              <Reservation_Details
                data={reservationDetails}
                showDetails={setShowEnterDetailsForm}
              />
            </>
          )}
        </section>
      )}
      <Outlet />
    </Container>
  );
};

export default Reservation;
