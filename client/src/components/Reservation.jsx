import { Container, Button, Input } from "./index";

const Reservation = () => {
  return (
    <Container>
      <section className=" h-full lg:h-screen md:grid grid-cols-2 md:py-6 gap-16 lg:w-5/6 pt-5 m-auto">
        <img
          src="/images/img_reservation.png"
          alt="Hero Image"
          className="w-11/12 m-auto my-5"
        />

        <form>
          <h1 className="text-5xl md:text-7xl text-center  font-bold text-[#301E08] my-5">
            Book a table
          </h1>
          <Input type="date" min="2024-06-2" max="2024-06-20" />
          <Input type="time" />
          <select
            name="seating-options"
            defaultValue="family"
            className="text-xl my-3 border-2 border-[#C4C4C4] py-2 px-4 rounded-xl w-full"
          >
            <option value="solo">Solo Seat (1)</option>
            <option value="intimate">Intimate Table (2)</option>
            <option value="cozy-corner">Cozy Corner (2-4)</option>
            <option value="family">Family Table (4-6)</option>
            <option value="group">Group Booth (6-8)</option>
            <option value="celebration">Celebration Table (8-10)</option>
          </select>
          <Button
            type="submit"
            className=" font-semibold my-3 px-10 py-5 rounded-2xl w-full text-xl "
          >
            Book now
          </Button>
        </form>
      </section>
    </Container>
  );
};

export default Reservation;
