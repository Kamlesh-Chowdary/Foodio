/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
const Button = ({
  children,
  type = "button",
  bgColor = "bg-primary",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    if (e.target.innerHTML === "Order now") navigate("/order");
    else if (e.target.innerHTML === "Reservation") navigate("/reservation");
  };

  return (
    <button
      type={type}
      {...props}
      className={`${bgColor} ${textColor} ${className} hover:-translate-y-1 hover:scale-90 text-nowrap`}
      onClick={handleNavigate}
    >
      {children}
    </button>
  );
};

export default Button;
