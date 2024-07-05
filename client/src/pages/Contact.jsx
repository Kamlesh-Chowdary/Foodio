import { useForm } from "react-hook-form";
import { Input, Button } from "../components/index";
const Contact = () => {
  const { register, handleSubmit, reset } = useForm();

  const handleFormSubmit = () => {
    reset();
  };

  return (
    <section className="lg:w-5/6 mx-auto px-3">
      <h1 className="text-7xl  font-bold text-[#301E08] text-center py-5">
        Contact us
      </h1>
      <p className="md:text-3xl text-2xl text-[#301E08] text-center pb-3">
        We love hearing from our customers. Feel free to share your experience
        or ask any questions you may have.
      </p>
      <div className="lg:h-screen md:grid grid-cols-2 gap-8 lg:py-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1924365.7855436064!2d-81.59718953879675!3d37.61317633460165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b38625779aaaab%3A0xc7f83bec971385e9!2sFoodio!5e0!3m2!1sen!2sin!4v1717502591293!5m2!1sen!2sin"
          width="100%"
          height="450"
          className="my-5"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Input placeholder="First name" {...register("firstName")} />
          <Input placeholder="Last name" {...register("lastName")} />
          <Input
            type="email"
            placeholder="Email address"
            {...register("email")}
          />
          <Input placeholder="Subject" {...register("subject")} />
          <textarea
            name="message"
            id="message"
            className="text-xl my-3 border-2 border-[#C4C4C4] py-2 px-4 rounded-xl w-full"
            rows="3"
            placeholder="Message"
          ></textarea>
          <Button
            type="submit"
            className="px-10 py-5 font-semibold my-3 rounded-2xl  text-xl w-full "
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
