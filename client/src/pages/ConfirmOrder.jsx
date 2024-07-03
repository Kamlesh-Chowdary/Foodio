import { useLocation, useNavigate } from "react-router-dom";
import { Status, Container } from "../components";
import { ArrowLeft } from "lucide-react";
const ConfirmOrder = () => {
  const location = useLocation();
  const orderDetails = location.state?.data;
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/cart");
  };

  return (
    <Container>
      <section className="lg:w-3/4 mx-auto lg:flex  gap-10 items-start lg:my-10 py-5 lg:py-10">
        <button
          onClick={goBack}
          className="bg-[#301E08] p-2 md:p-4 rounded-full my-5 md:my-0 "
        >
          <ArrowLeft size={30} color="white" />
        </button>
        <div className="w-full">
          <Status status={true} orderId={orderDetails._id} />
        </div>
      </section>
    </Container>
  );
};

export default ConfirmOrder;
