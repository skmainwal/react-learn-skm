import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous{" "}
      </button>{" "}
      <div className="page-numbers">
        {" "}
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            className={`page-number ${pageNum === currentPage ? "active" : ""}`}
            onClick={() => onPageChange(pageNum)}
          >
            {" "}
            {pageNum}{" "}
          </button>
        ))}{" "}
      </div>{" "}
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next{" "}
      </button>{" "}
    </div>
  );
};

export default Pagination;
