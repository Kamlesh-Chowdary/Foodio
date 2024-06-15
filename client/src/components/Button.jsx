/* eslint-disable react/prop-types */

const Button = ({
  children,
  type = "button",
  bgColor = "bg-primary",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      {...props}
      className={`${bgColor} ${textColor} ${className} hover:-translate-y-1 hover:scale-90 text-nowrap`}
    >
      {children}
    </button>
  );
};

export default Button;
