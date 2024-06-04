import { Container, Button } from "./index";
const About = () => {
  return (
    <Container>
      <section className=" h-full lg:h-screen md:grid grid-cols-2 md:py-14 gap-16  lg:w-5/6 pt-5 m-auto">
        <div className="bg-[#d0ccc719] p-8  md:my-10 lg:my-0 rounded-full">
          <div className="bg-[#d0ccc733] p-8  rounded-full">
            <img
              src="/images/img_about_us_hero.png"
              alt="Hero Image"
              className="py-auto"
            />
          </div>
        </div>
        <div className="p-3">
          <h1 className="text-7xl md:text-5xl lg:text-7xl font-bold text-[#301E08] ">
            About Our <span className="text-primary">Restaurant</span>
          </h1>
          <p className="text-xl text-[#301E08] py-7 leading-relaxed">
            Welcome to Foodio, your go-to online destination for table
            reservations and delicious food orders. Experience seamless dining
            with our easy-to-use app, ensuring you enjoy your meals
            effortlessly.
          </p>

          <Button className=" font-semibold px-14 py-5 rounded-2xl  text-xl ">
            Order now
          </Button>
        </div>
      </section>
      <section className=" h-full lg:h-screen md:grid grid-cols-2 md:py-10 gap-16 lg:w-5/6 pt-5 m-auto">
        <div>
          <h1 className="text-7xl  font-bold text-[#301E08] ">
            <span className="text-primary">Owner</span> & Executive Chef
          </h1>
          <p className="text-5xl text-[#301E08] py-6">Ismail Marzuki</p>
          <p className="text-xl text-[#301E08] ">
            Meet Ismail Marzuki, the visionary owner and executive chef of
            Foodio. With over 20 years of culinary experience, Ismail combines
            innovative techniques with a passion for fresh, local ingredients to
            create unforgettable dishes. Under Ismail&apos;s leadership, Foodio
            promises a dining experience that&apos;s both exceptional and
            accessible.
          </p>
        </div>
        <div className=" flex justify-center items-center">
          <img
            src="/images/img_about_us_owner.png"
            alt="Hero Image"
            className="my-10 md:my-0"
            width="75%"
          />
        </div>
      </section>
    </Container>
  );
};

export default About;
