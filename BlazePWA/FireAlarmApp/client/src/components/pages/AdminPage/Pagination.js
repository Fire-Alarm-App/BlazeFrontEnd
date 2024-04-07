import React from 'react';
import "./Pagination.css";
import classNames from 'classnames';

const range = (start, end) => {
  if (end < start) {
    console.error(`Invalid range: start (${start}) is greater than end (${end}).`);
    return [];
  }
  return [...Array(end - start + 1).keys()].map(el => el + start);
};

const getPagesCut = ({ pagesCount, pagesCutCount, currentPage }) => {
  let start, end;
  const half = Math.floor(pagesCutCount / 2);

  if (pagesCount <= pagesCutCount) {
    start = 1;
    end = pagesCount;
  } else if (currentPage <= half) {
    start = 1;
    end = pagesCutCount;
  } else if (currentPage + half >= pagesCount) {
    start = pagesCount - pagesCutCount + 1;
    end = pagesCount;
  } else {
    start = currentPage - half;
    end = start + pagesCutCount - 1;
  }

  return { start, end };
};

const PaginationItem = ({ page, currentPage, onPageChange, isDisabled }) => {
  const liClasses = classNames('page-item', {
    active: page === currentPage,
    disabled: isDisabled,
  });

  const handleClick = () => {
    if (!isDisabled) {
      onPageChange(page);
    }
  };

  return (
    <li className={liClasses} onClick={handleClick}>
      <span className="page-link">{typeof page === 'number' ? page : page}</span>
    </li>
  );
};

const Pagination = ({ currentPage = 1, total = 0, limit = 10, onPageChange }) => {
  // Early return if total pages are not calculable or if there's no content to paginate
  if (total <= 0 || limit <= 0) {
    return <div>No pages to display.</div>;
  }

  const pagesCount = Math.ceil(total / limit);
  // Adjust currentPage if out of bounds
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), pagesCount);
  const pagesCut = getPagesCut({ pagesCount, pagesCutCount: 5, currentPage: safeCurrentPage });
  const pages = range(pagesCut.start, pagesCut.end);

  const isFirstPage = safeCurrentPage === 1;
  const isLastPage = safeCurrentPage === pagesCount;

  return (
    <ul className="pagination">
      <PaginationItem page="First" currentPage={safeCurrentPage} onPageChange={() => onPageChange(1)} isDisabled={isFirstPage} />
      <PaginationItem page="Prev" currentPage={safeCurrentPage} onPageChange={() => onPageChange(Math.max(1, safeCurrentPage - 1))} isDisabled={isFirstPage} />
      {pages.map(page => (
        <PaginationItem key={page} page={page} currentPage={safeCurrentPage} onPageChange={onPageChange} />
      ))}
      <PaginationItem page="Next" currentPage={safeCurrentPage} onPageChange={() => onPageChange(Math.min(pagesCount, safeCurrentPage + 1))} isDisabled={isLastPage} />
      <PaginationItem page="Last" currentPage={safeCurrentPage} onPageChange={() => onPageChange(pagesCount)} isDisabled={isLastPage} />
    </ul>
  );
};

export default Pagination;
