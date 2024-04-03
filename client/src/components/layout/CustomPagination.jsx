import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';

export default function CustomPagination({ resultsPerPage, productsCount }) {
  const [currentPage, setCurrentPage] = useState();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);

    if (searchParams.has('page')) {
      searchParams.set('page', pageNumber);
    } else {
      searchParams.append('page', pageNumber);
    }

    const path = `${window.location.pathname}?${searchParams}`;

    navigate(path);
  });

  return (
    <div className="d-flex justify-content-center my-5">
      {productsCount > resultsPerPage && (
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={resultsPerPage}
        totalItemsCount={productsCount}
        onChange={handlePageChange}
        prevPageText="Prev"
        firstPageText="First"
        lastPageText="Last"
        nextPageText="Next"
        itemClass="page-item"
        linkClass="page-link"
      />
      )}
    </div>
  );
}
