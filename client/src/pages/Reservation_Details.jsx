/* eslint-disable react/prop-types */
import { Container, Button, Input, Select } from "../components/index";
import { Calendar, Clock, UserRound, X } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import customerService from "../services/customer.service";
import reservationService from "../services/reservation.service";
import { useLocation, useNavigate } from "react-router-dom";

const Reservation_Details = () => {
  const location = useLocation();
  const data = location.state?.data;
  const date = moment(data?.date);
  const formattedDate = date.format("dddd, Do MMMM YYYY");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const reserveTable = (params) => {
    navigate("../confirm", { state: { data: params.data } });
  };

  const handleConfirm = async (customerData) => {
    setError("");

    try {
      const response = await customerService.createCustomer({
        ...customerData,
      });

      if (response) {
        setError("");
        try {
          const reservationDetails = await reservationService.createReservation(
            response.data._id,
            {
              ...data,
              occation: customerData.occation,
            }
          );
          if (reservationDetails) {
            if (reservationDetails.success) {
              reserveTable(reservationDetails);
            }
          }
        } catch (error) {
          setError(error);
        }
      }
    } catch (error) {
      setError(error);
    } finally {
      reset();
    }
  };
  const overRideCss = {
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
    fontSize: "1rem",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  };

  return (
    <Container>
      <section className=" bg-white fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  z-40 rounded-2xl p-5  shadow-xl shadow-black/50 overflow-y-auto max-h-full md:w-auto w-5/6 scroll-smooth  scrollbar-thin ">
        <span
          className="absolute right-0 p-3 top-0 "
          onClick={() => navigate("/reservation")}
        >
          <X />
        </span>
        <h1 className="text-3xl text-center  font-bold text-[#301E08] my-3">
          Reservation
        </h1>

        <div className="lg:flex gap-10 ">
          <form className="py-3" onSubmit={handleSubmit(handleConfirm)}>
            <h1 className="text-xl font-bold text-[#301E08] pl-1">
              Data Order
            </h1>
            {error && (
              <p
                className=" text-xl text-center font-semibold text-red-600"
                role="alert"
              >
                {error}
              </p>
            )}
            <Input
              style={overRideCss}
              placeholder="First Name"
              {...register("firstName", { required: true })}
            />
            <Input
              style={overRideCss}
              placeholder="Last Name"
              {...register("lastName", { required: true })}
            />
            <Input
              type="number"
              placeholder="Phone number"
              {...register("phonenumber", {
                required: true,
                validate: (value) => {
                  const isValidPhoneNumber = /^\d{10}$/.test(value);
                  return isValidPhoneNumber || "Enter a valid phonenumber";
                },
              })}
            />
            {errors.phonenumber && (
              <p className=" text-sm text-red-600" role="alert">
                {errors.phonenumber.message}
              </p>
            )}
            <Input
              type="email"
              style={overRideCss}
              placeholder="Email Address"
              {...register("email", { required: true })}
            />
            <Select
              style={{
                fontSize: "1rem",
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
              }}
              options={[
                "Birthday Celebration",
                "Anniversary",
                "Business Meeting",
                "Date Night",
                "Family Gathering",
                "Engagement Party",
                "Casual Dine",
                "Others",
              ]}
              {...register("occation", { required: true })}
            />
            <Input
              value="Foodio"
              className="hidden"
              {...register("address", { required: true })}
            />
            <textarea
              placeholder="Add a special request"
              className="text-base my-2 border-2 border-[#C4C4C4]  px-4 py-1 rounded-xl w-full"
              rows={2}
              {...register("message", { required: true })}
            />
            <Button
              type="submit"
              className="px-10 py-2 rounded-2xl w-full text-lg"
            >
              Confirm Reservation
            </Button>
          </form>
          <section className="lg:w-1/2">
            <h1 className="text-xl py-3 font-bold text-[#301E08]">
              Reservation Details
            </h1>
            <div className="flex justify-start gap-5 items-center py-1 ">
              <Calendar />
              <p>{formattedDate}</p>
            </div>
            <div className="flex justify-start gap-5 items-center py-1">
              <Clock />
              <p>{data.time}</p>
            </div>
            <div className="flex justify-start gap-5 items-center py-1">
              <UserRound />
              <p>{data.members}</p>
            </div>

            <h1 className="text-xl  py-3 font-bold text-[#301E08]">
              Restaurant Information
            </h1>
            <p className="text-base py-1 text-[#301E08]">
              Welcome to Foodio, your go-to online destination for table
              reservations and delicious food orders. Experience seamless dining
              with our easy-to-use app, ensuring you enjoy your meals
              effortlessly.
            </p>
          </section>
        </div>
      </section>
    </Container>
  );
};

export default Reservation_Details;
