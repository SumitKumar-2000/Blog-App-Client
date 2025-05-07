import { BsChevronDoubleLeft, BsChevronLeft, BsChevronRight, BsChevronDoubleRight } from "react-icons/bs";

export default function PaginationControls({ page, lastPage, limit, count, onPageChange }) {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center gap-2">
        <span>Show</span>
        <select
          value={limit}
          onChange={(e) => onPageChange({ limit: Number(e.target.value), page })}
          className="border p-1"
        >
          {[10, 25, 50].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <span>entries</span>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => onPageChange({ page: 1, limit })} disabled={page === 1}>
          <BsChevronDoubleLeft />
        </button>
        <button onClick={() => onPageChange({ page: page - 1, limit })} disabled={page === 1}>
          <BsChevronLeft />
        </button>
        <span>
          Page <input
            type="number"
            value={page}
            min={1}
            max={lastPage}
            onChange={(e) => onPageChange({ page: Number(e.target.value), limit })}
            className="w-12 text-center border"
          /> of {lastPage}
        </span>
        <button onClick={() => onPageChange({ page: page + 1, limit })} disabled={page === lastPage}>
          <BsChevronRight />
        </button>
        <button onClick={() => onPageChange({ page: lastPage, limit })} disabled={page === lastPage}>
          <BsChevronDoubleRight />
        </button>
      </div>
    </div>
  );
}
