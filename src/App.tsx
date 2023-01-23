import { useState } from "react";
import "./App.css";
import { DataTable } from "./components/DataTable";
import clients from "./data/clients";
import users from "./data/users";

function App() {
  const header = <h2>Table Header</h2>;
  const columns = [
    {
      name: "ID",
      selector: "id",
      sortable: false,
    },
    {
      name: "Firstname",
      selector: "firstname",
      sortable: true,
    },
    {
      name: "LastName",
      selector: "lastname",
      sortable: false,
    },
    {
      name: "Age",
      selector: "age",
      sortable: true,
    },
    {
      name: "Fullname",
      selector: "fullname",
      sortable: false,
    },
  ];

  const [selected, setSelected] = useState([]);
  const getUsers = async (): Promise<object[]> => {
    return new Promise<object[]>((resolve) => {
      resolve(users);
    });
  };

  return (
    <>
      <header>
        <h1>Table Component Challenge</h1>
      </header>
      <main className="App">
        <DataTable
          header={header}
          columns={columns}
          selectableRows={true}
          rawData={clients}
          selected={selected}
          setSelected={setSelected}
        />

        <DataTable
          header={<h1>Promised Data Header</h1>}
          columns={columns}
          selectableRows={false}
          promisedData={getUsers()}
          selected={selected}
          setSelected={setSelected}
        />

        {/* <br />
        {selected.map((s) => (
          <div>{s.firstname},</div>
        )
        )} */}
      </main>
      <footer>
        <a href="mailto:zahra.sheykhlar@gmail.com">zahra.sheykhlar@gmail.com</a>
      </footer>
    </>
  );
}

export default App;
