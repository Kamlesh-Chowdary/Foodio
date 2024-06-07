/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { forwardRef, useId } from "react";

const Select = ({ options = [], className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div>
      <select
        id={id}
        className={`text-xl   my-3 border-2 border-[#C4C4C4] py-2 px-4 rounded-xl w-full ${className}`}
        {...props}
        ref={ref}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default forwardRef(Select);
