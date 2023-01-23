import "./Pagination.css";

export type Props = {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({
  items,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(items / pageSize); // 100/10

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div>
      <span>
        Showing {currentPage * pageSize - pageSize + 1} to{" "}
        {currentPage * pageSize > items ? items : currentPage * pageSize} of{" "}
        {items} entries
      </span>
      <ul className="pagination">
        <li>
          <button
            className="pageLink"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "pageItemActive" : "pageItem"}
          >
            <a className="pageLink" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <li>
          <button
            className="pageLink"
            disabled={currentPage >= items / pageSize}
            onClick={() => onPageChange(currentPage + 1)}
          >
            next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
