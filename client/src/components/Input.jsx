/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useId } from "react";

const Input = forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();

    return (
      <div>
        {label && (
          <label
            htmlFor={id}
            className="text-xl font-medium text-[#301E08] my-3"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={`${className} text-xl my-3 border-2 border-[#C4C4C4] py-2 px-4 rounded-xl w-full`}
          {...props}
          ref={ref}
          id={id}
        />
      </div>
    );
  }
);

export default Input;
