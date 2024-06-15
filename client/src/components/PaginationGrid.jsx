import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

const PaginationGrid = ({ handleNextPage, handlePrevPage, currentPage }) => {
  return (
    <div className="flex justify-center items-center gap-3 py-5">
      <CircleArrowLeft onClick={handlePrevPage} />
      <p className="bg-[#301E08] py-1 px-3 text-white rounded">{currentPage}</p>
      <CircleArrowRight onClick={handleNextPage} />
    </div>
  );
};

export default PaginationGrid;
