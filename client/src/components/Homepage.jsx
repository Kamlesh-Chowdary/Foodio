import { Container, Button } from "./index";
const Homepage = () => {
  return (
    <Container>
      <section className=" h-full lg:h-lvh md:grid grid-cols-2 md:pt-14 gap-16 lg:w-5/6 pt-5 m-auto">
        <div>
          <h1 className="text-7xl  font-bold text-[#301E08] ">
            Best Restaurant In <span className="text-primary">Town.</span>
          </h1>
          <p className="text-xl text-[#301E08] py-7">
            We provide best food in town, we provide home delivery and dine in
            services.
          </p>
          <div className="flex gap-4 flex-wrap md:flex-nowrap">
            <Button className=" font-semibold px-10 py-5 rounded-2xl  text-xl ">
              Order now
            </Button>
            <Button
              textColor="text-primary"
              bgColor="bg-[#F8E3E3]"
              className="px-10 py-5 font-semibold  rounded-2xl  text-xl "
            >
              Reservation
            </Button>
          </div>
        </div>
        <div>
          <img
            src="/images/img_hero.png"
            alt="Hero Image"
            className="mt-10 md:my-0"
          />
        </div>
      </section>
      <section className=" h-full lg:h-lvh md:grid grid-cols-2 md:pt-14 gap-20 lg:w-5/6 pt-5 m-auto">
        <h1 className="text-7xl md:hidden font-bold text-[#301E08] ">
          Our Most Popular <span className="text-primary">Dish.</span>
        </h1>
        <img
          src="/images/img_popular_dish_quinoa.png"
          alt="popular dish"
          className="mt-5 md:my-0 w-4/5 md:w-full m-auto"
        />
        <div>
          <h1 className="text-7xl hidden md:block font-bold text-[#301E08] ">
            Our Most Popular <span className="text-primary">Dish.</span>
          </h1>
          <p className="text-xl text-[#301E08] py-7">
            This dish is full of flavor and nutrition! Quinoa is a complete
            protein, providing all the essential amino acids your body needs,
            and is also a good source of fiber.
          </p>
          <Button className=" font-semibold px-10 mb-5 py-5 rounded-2xl  text-xl ">
            Order now
          </Button>
        </div>
      </section>
      <section className="lg:w-5/6 py-5 m-auto ">
        <h1 className="text-5xl md:text-7xl text-center font-bold text-[#301E08] pb-10">
          Our Popular Chef
        </h1>
        <div className="md:grid grid-cols-3 gap-8  lg:m-20 mx-5">
          <div>
            <img
              src="/images/img_chef_1.png"
              alt="chef 1"
              className="bg-gray-200 rounded-3xl "
            />
            <p className="text-3xl text-center font-bold text-[#301E08] py-5">
              Betran Komar
            </p>
            <p className="text-xl text-center font-normal text-[#301e0890] mb-5">
              Head chef
            </p>
          </div>
          <div>
            <img
              src="/images/img_chef_2.png"
              alt="chef 2"
              className="bg-gray-200 rounded-3xl "
            />
            <p className="text-3xl text-center font-bold text-[#301E08] py-5">
              Ferry Sauwi
            </p>
            <p className="text-xl text-center font-normal text-[#301e0890] mb-5">
              Executive chef
            </p>
          </div>
          <div className="">
            <img
              src="/images/img_chef_3.png"
              alt=" chef 3"
              className="bg-gray-200 rounded-3xl "
            />
            <p className="text-3xl text-center font-bold text-[#301E08] py-5">
              Iswan Cracho
            </p>
            <p className="text-xl text-center font-normal text-[#301e0890] mb-5">
              Junior Chef
            </p>
          </div>
        </div>
      </section>
      <section className=" lg:h-lvh pb-5 lg:py-24">
        <div className="bg-[#FCD9D9] py-14 my-10   lg:w-5/6 m-auto rounded-3xl">
          <h1 className="text-6xl text-center font-bold text-[#301E08] pb-5">
            Hungry? We are open now..
          </h1>
          <div className="flex justify-center gap-2 pt-10">
            <Button className=" font-semibold px-10 lg:px-14 py-5 rounded-2xl  text-xl">
              Order now
            </Button>
            <Button
              textColor="text-primary"
              bgColor="bg-[#F8E3E3]"
              className=" px-10 lg:px-14 py-5 font-semibold  rounded-2xl  text-xl "
            >
              Reservation
            </Button>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Homepage;
