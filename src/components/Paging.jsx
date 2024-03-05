import React from "react";

const Paging = ({ dataLength, pageSize, pagingTo }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(dataLength / pageSize); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumber.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => pagingTo(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paging;
