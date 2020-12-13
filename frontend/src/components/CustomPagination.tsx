import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import HoverIcon from "./HoverIcon";

const CustomPagination: React.FC<{
  currentPage: number;
  totalPages: number;
  path: string;
}> = ({ currentPage, totalPages, path }) => {
  const previousPath = `${path}${
    currentPage === 1 ? currentPage : currentPage - 1
  }`;
  const nextPath = `${path}${
    currentPage === totalPages ? currentPage : currentPage + 1
  }`;

  const pagesJSX = [];
  const pages = [];
  let middle;

  if (currentPage === 1) {
    if (totalPages % 2 === 0) {
      middle = totalPages / 2;
    } else {
      middle = Math.floor(totalPages / 2);
    }
  } else {
    middle = currentPage;
  }

  if (totalPages <= 7) {
    for (let i = 1; i < totalPages + 1; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1, 2);

    if (currentPage >= totalPages - 4) {
      pages.push("break-a");
      pages.push(totalPages - 4, totalPages - 3, totalPages - 2);
    } else if (currentPage !== 2) {
      if (currentPage !== 3) pages.push("break-b");
      pages.push(middle, middle + 1, middle + 2);
    } else {
      pages.push(middle + 1, middle + 2);
    }

    if (currentPage < totalPages - 4 && middle + 4 !== totalPages)
      pages.push("break-c");
    pages.push(totalPages - 1, totalPages);
  }

  for (let i = 0; i < pages.length; i++) {
    if (typeof pages[i] !== "number") {
      pagesJSX.push(
        <span key={pages[i]} className="text-white">
          <BsThreeDots />
        </span>
      );
    } else {
      pagesJSX.push(
        <Link
          key={pages[i]}
          to={`${path}${pages[i]}`}
          className={`page white-link ${
            currentPage === pages[i] ? "page-active" : ""
          }`}
        >
          {pages[i]}
        </Link>
      );
    }
  }

  return (
    <div className="pagination">
      {pagesJSX.length > 0 && (
        <>
          <Link to={previousPath}>
            <HoverIcon
              color="rgb(65, 64, 64)"
              hoverColor="gray"
              size="2rem"
              hoverSize="2rem"
            >
              <AiFillCaretLeft />
            </HoverIcon>
          </Link>

          {pagesJSX}

          <Link to={nextPath}>
            <HoverIcon
              color="rgb(65, 64, 64)"
              hoverColor="gray"
              size="2rem"
              hoverSize="2rem"
            >
              <AiFillCaretRight />
            </HoverIcon>
          </Link>
        </>
      )}
    </div>
  );
};

export default CustomPagination;
