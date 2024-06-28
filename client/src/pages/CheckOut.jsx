import { Container, Input, Button, Status } from "../components/index";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import customerService from "../services/customer.service";
import { useState } from "react";
import orderService from "../services/order.service";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";
const CheckOut = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.cart.cartItems);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const goBack = () => {
    navigate(-1);
  };
  const handleDetailsSubmit = async (data) => {
    setError("");
    try {
      const response = await customerService.createCustomer({ ...data });
      if (response) {
        setError("");
        try {
          const orderResponse = await orderService.createOrder(
            response.data._id,
            {
              items: orderDetails.map((item) => ({
                dishId: item._id,
                quantity: item.quantity,
              })),
              data: data.message,
              paymentMethod: data.paymentMethod,
            }
          );
          if (orderResponse) {
            if (orderResponse.success) {
              setOrderId(orderResponse.data._id);
              setIsOrderPlaced(true);
              dispatch(clearCart());
            }
          }
        } catch (error) {
          setError(error);
        }
      }
    } catch (error) {
      setError(error);
    }
    reset();
  };
  return (
    <Container>
      <section className="lg:w-3/4 mx-auto lg:flex  gap-10 items-start lg:my-10 py-5 lg:py-10">
        <button
          onClick={goBack}
          className="bg-[#301E08] p-2 md:p-4 rounded-full my-5 md:my-0"
        >
          <ArrowLeft size={30} color="white" />
        </button>
        {!isOrderPlaced ? (
          <div className="bg-white rounded-2xl px-5  flex-grow lg:mx-20">
            <form onSubmit={handleSubmit(handleDetailsSubmit)}>
              <h1 className="text-5xl text-center font-bold text-[#301E08] py-5">
                Checkout
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
                label="Shipping Address"
                placeholder="13th Street. New York, NY 10011"
                {...register("address", { required: true })}
              />
              <Input
                label="Order Data"
                placeholder="First name"
                {...register("firstName", { required: true })}
              />
              <Input
                placeholder="last name"
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
                placeholder="Email address"
                {...register("email", { required: true })}
              />
              <textarea
                placeholder="Message"
                className="text-xl my-3 border-2 border-[#C4C4C4] py-2 px-4 rounded-xl w-full"
                rows={2}
                {...register("message", { required: true })}
              />

              <h1 className="text-xl font-medium text-[#301E08] mb-3">
                Payment Method
              </h1>
              <section className=" grid md:grid-cols-2 gap-5 my-3">
                <div className="bg-[#f9f9f9]  py-2 px-4 rounded-xl ">
                  <input
                    type="radio"
                    id="cash"
                    name="payment_method"
                    value="Cash On Delivery"
                    checked
                    {...register("paymentMethod", { required: true })}
                  />
                  <label htmlFor="cash" className="text-xl text-[#301E08] px-4">
                    Cash On Delivery
                  </label>
                </div>

                <div className="bg-[#f9f9f9]  py-2 px-4 rounded-xl">
                  <input
                    type="radio"
                    id="card"
                    name="payment_method"
                    disabled
                    value="Credit Card"
                    {...register("paymentMethod", { required: true })}
                  />
                  <label htmlFor="cash" className="text-xl text-[#301E08] px-4">
                    Credit Card{" "}
                    <span className="text-sm px-1 opacity-50">
                      (available soon)
                    </span>
                  </label>
                </div>

                <div className="bg-[#f9f9f9]  py-2 px-4 rounded-xl ">
                  <input
                    type="radio"
                    id="bank"
                    name="payment_method"
                    disabled
                    value="Bank Transfer"
                    {...register("paymentMethod", { required: true })}
                  />
                  <label
                    htmlFor="cash"
                    className="text-xl  text-[#301E08] px-4"
                  >
                    Bank Transfer
                    <span className="text-sm px-1 opacity-50">
                      (available soon)
                    </span>
                  </label>
                </div>

                <div className="bg-[#f9f9f9]  py-2 px-4 rounded-xl ">
                  <input
                    type="radio"
                    id="upi"
                    name="payment_method"
                    disabled
                    value="UPI"
                    {...register("paymentMethod", { required: true })}
                  />
                  <label
                    htmlFor="cash"
                    className="text-xl  text-[#301E08] px-4"
                  >
                    UPI
                    <span className="text-sm px-1 opacity-50 ">
                      (available soon)
                    </span>
                  </label>
                </div>
              </section>
              <Button
                className="font-semibold px-14 py-5 w-full my-5 rounded-2xl  text-xl "
                type="submit"
              >
                Order now{" "}
              </Button>
            </form>
          </div>
        ) : (
          <section className="w-full">
            <Status status={isOrderPlaced} orderId={orderId} />
          </section>
        )}
      </section>
    </Container>
  );
};

export default CheckOut;
