import { useState, useEffect } from "react";
import "./DataTable.css";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import Pagination from "./Pagination";

interface column {
  name: string;
  selector: any;
  sortable: boolean;
}

type DataTableProps = {
  header?: any;
  columns: column[];
  selectableRows: boolean;
  rawData?: object[];
  promisedData?: Promise<object[]>;
  selected: object[];
  setSelected: any;
};

const DataTable: React.FC<DataTableProps> = (props) => {
  const {
    header,
    columns,
    selectableRows,
    rawData,
    promisedData,
    selected,
    setSelected,
  } = props;

  const [data, setData] = useState(rawData);
  const [sortedField, setSortedField] = useState();
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    if (promisedData) {
      promisedData.then((res) => setData(res)).catch((er) => console.log(er)); // TODO: show error message
    }
  }, [promisedData]);

  if (sortedField && data) {
    data.sort((a, b) => {
      if (a[sortedField] < b[sortedField]) {
        return sortOrder === "ascending" ? -1 : 1;
      }
      if (a[sortedField] > b[sortedField]) {
        return sortOrder === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const handleSelect = (row: object) => {
    const isSelected: boolean = selected.includes(row);
    isSelected
      ? setSelected(selected.filter((x) => x !== row))
      : setSelected([...selected, row]);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setSelected(data) : setSelected([]);
  };

  const requestSort = (key: any) => {
    if (sortOrder === "ascending") {
      setSortOrder("descending");
    } else setSortOrder("ascending");
    setSortedField(key);
  };

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };
  const paginate = (items: object[], pageNumber: number, pageSize: number) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };
  const paginatedData = data && paginate(data, currentPage, pageSize);

  return (
    <div className="container ">
      <table id="dataTable">
        {header && <caption>{header}</caption>}
        <thead>
          <tr>
            {selectableRows && (
              <th>
                <input type="checkbox" onChange={(e) => handleSelectAll(e)} />
              </th>
            )}
            {columns.map((culomn, index) => (
              <th key={index}>
                <b>{culomn.name}</b>
                {culomn.sortable && (
                  <>
                    {(sortOrder === "ascending" ||
                      sortOrder === "" ||
                      sortedField !== culomn.selector) && (
                        <FaSortDown
                          className="pointer"
                          onClick={() => requestSort(culomn.selector)}
                        />
                      )}
                    {(sortOrder === "descending" ||
                      sortOrder === "" ||
                      sortedField !== culomn.selector) && (
                        <FaSortUp
                          className="pointer"
                          onClick={() => requestSort(culomn.selector)}
                        />
                      )}
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData ? (
            paginatedData
              .map((row, index) => (
                <tr key={`row-${index}`}>
                  {selectableRows && (
                    <td>
                      {" "}
                      <input
                        type="checkbox"
                        checked={selected.includes(row)}
                        onChange={() => handleSelect(row)}
                      />
                    </td>
                  )}
                  {Object.values(row).map((value, index2) => (
                    <td key={`cell-${index2}`}>{value}</td>
                  ))}
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={columns.length}>Is Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        items={data ? data.length : 0}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export { DataTable };
