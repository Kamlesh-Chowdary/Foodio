/* eslint-disable react/prop-types */
import { Container, Button, Input, Select } from "./index";
import { Calendar, Clock, UserRound, X } from "lucide-react";
import moment from "moment";
import { useForm } from "react-hook-form";

const Reservation_Details = ({ data, showDetails }) => {
  const date = moment(data.date);
  const formattedDate = date.format("dddd, Do MMMM YYYY");
  const { register, handleSubmit } = useForm();
  return (
    <Container>
      <section className=" bg-white fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  z-40 rounded-2xl p-5  shadow-xl shadow-black/50 overflow-y-auto max-h-3/4 w-3/4 scroll-smooth">
        <span
          className="absolute right-0 p-3 top-0 "
          onClick={() => showDetails(false)}
        >
          <X />
        </span>
        <h1 className="text-5xl text-center  font-bold text-[#301E08] my-5">
          Reservation
        </h1>

        <div className="lg:flex  justify-start gap-5">
          <form>
            <h1 className="text-xl   font-bold text-[#301E08]">Data Order</h1>
            <Input
              placeHolder="First Name"
              {...register("firstName", { required: true })}
            />
            <Input
              placeHolder="Last Name"
              {...register("lastName", { required: true })}
            />
            <Input
              type="tel"
              placeHolder="Phone number"
              {...register("phonenumber", { required: true })}
            />
            <Input
              type="email"
              placeHolder="Email Address"
              {...register("email", { required: true })}
            />
            <Select
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
            />
            <textarea
              placeholder="Add a special request"
              className="text-xl my-3 border-2 border-[#C4C4C4] py-2 px-4 rounded-xl w-full"
              rows={2}
            />
            <Button
              type="submit"
              className=" font-semibold my-3 px-10 py-5 rounded-2xl w-full text-xl "
            >
              Confirm Reservation
            </Button>
          </form>
          <section>
            <div>
              <h1 className="text-xl font-bold text-[#301E08]">
                Reservation Details
              </h1>
              <div className="flex justify-start gap-5 items-center">
                <Calendar />
                <p>{formattedDate}</p>
              </div>
              <div className="flex justify-start gap-5 items-center">
                <Clock />
                <p>{data.time}</p>
              </div>
              <div className="flex justify-start gap-5 items-center">
                <UserRound />
                <p>{data.members}</p>
              </div>
            </div>
            <div>
              <h1 className="text-xl   font-bold text-[#301E08]">
                Restaurant Information
              </h1>
            </div>
          </section>
        </div>
      </section>
    </Container>
  );
};

export default Reservation_Details;
