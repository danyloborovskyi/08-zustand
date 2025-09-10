import ReactPaginate from 'react-paginate';

import style from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  onPageChange,
  currentPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected)}
      forcePage={currentPage - 1}
      containerClassName={style.pagination}
      activeClassName={style.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
