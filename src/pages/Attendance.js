import styled from "styled-components";
import SideFixture from "../page-frame/SideFixture";
import { useState } from "react";
//all firestore import in single file
import {
  colRef,
  addDoc,
  deleteDoc,
  doc,
  db,
  serverTimestamp,
  GetDocuments,
  GetDocument,
} from "../firebase/config";

const AttendanceTable = styled.div`
  background-color: var(--clr-light-grey);
  display: flex;
  overflow: auto;
  width: 100vw;
  height: 100vh;
`;
const Container = styled.div`
  padding: 30px;
  flex-grow: 20;
  margin: 0;
  margin-left: 15%;

  h2 {
    text-align: left;
    color: var(--clr-text-green);
    font-weight: 700;
    font-size: 32px;
  }
`;

const Label = styled.div`
  width: 35%;
  background-color: white;
  border-radius: 25px;
  margin: 10px 0;
  padding: 5px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  button {
    border: 3px solid rgba(0, 0, 0, 0);
    background-color: rgba(0, 0, 0, 0);
    margin: 0 5px;
    color: var(--clr-darkest-grey);
    font-size: 14px;

    &:hover {
      border-bottom: 3px solid var(--clr-green);
      transform: none;
    }
  }
`;

const TableContainer = styled.div`
  border-radius: 25px;
  /* box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.3); */
  margin-top: 30px;
  width: 100%;
  height: auto;
  padding: 10px;
  background-color: white;
`;
const Table = styled.table`
  margin: 15px 0;
  padding: 5px 12px;
  width: 100%;
  border: none;
  border-collapse: collapse;

  th {
    height: 40px;
    border-top: 2px solid var(--clr-darker-grey);
    border-bottom: 2px solid var(--clr-darker-grey);
  }
  tr {
    height: 35px;
    margin: 20px 0;
    padding: 15px 0;
  }

  tr:nth-child(even) {
    background-color: var(--clr-light-grey);
  }

  tr:last-child {
    border-bottom: 2px solid var(--clr-darker-grey);
  }
`;

const ManualButton = styled.button`
  background-color: white;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 25px;
  font-size: 14px;
  width: 18%;
  margin: 0 20px;
  height: 2.8em;
  /* font-weight: 500; */
  color: var(--clr-text-green);

  &:hover {
    transform: scale(1.01);
    color: var(--clr-white);
    background-color: var(--clr-text-green);
  }
`;

const ManualForm = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 5px;
  align-self: center;
  margin: 10px auto;

  label {
    display: inline-block;
    margin: 5px auto;
  }

  input,
  select {
    height: 30px;
    border-radius: 25px;
    border: 1px solid rgba(0, 0, 0, 1);
    margin: 5px;
    padding: 5px;
  }

  button {
    height: 30px;
    width: 30%;
    background-color: white;
    border-radius: 25px;
    border: 1px solid rgba(0, 0, 0, 1);
    margin: 5px auto;
    padding: 5px;
  }
`;

export default function Attendance() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [id, setId] = useState("");
  const [showForm, setShowForm] = useState(false);

  function handleAdd(e) {
    e.preventDefault();

    addDoc(colRef, {
      name: name,
      matricnumber: matricNumber,
      course: course,
      addAt: serverTimestamp(),
    }).then(() => {
      setName("");
      setCourse("MCT 501");
      setMatricNumber("");
    });

    GetDocuments();
    GetDocument();
  }

  function handleDelete(e) {
    e.preventDefault();

    const docRef = doc(db, "cards", "L1y5Q6bU75M4teCCfN5M");
    deleteDoc(docRef).then(() => {
      setId("");
    });
  }

  return (
    <AttendanceTable>
      <SideFixture />
      <Container>
        <h2>Attendance Table</h2>
        <div
          style={{
            display: "flex",
            flex: "row no-wrap",
            alignItems: "center",
          }}
        >
          {" "}
          <Label>
            Sort by:
            <button>100lvl</button>
            <button>200lvl</button>
            <button>300lvl</button>
            <button>400lvl</button>
            <button>500lvl</button>
          </Label>
          <ManualButton
            onClick={() => {
              setShowForm(!showForm);
            }}
          >
            Add attendance manually{" "}
          </ManualButton>
        </div>

        {showForm ? (
          <ManualForm>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              value={name}
            />
            <input
              type="text"
              onChange={(e) => setMatricNumber(e.target.value)}
              placeholder="Matric number"
              value={matricNumber}
            />
            <label for="course">course</label>
            <select onChange={(e) => setCourse(e.target.value)} name="course">
              <option value="MCT501">MCT 501</option>
              <option value="MCT 509">MCT 509</option>
              <option value="EEE 527">EEE 527</option>
            </select>

            <button onClick={handleAdd}>add </button>

            <input
              type="text"
              onChange={(e) => setId(e.target.value)}
              placeholder="ID"
              value={id}
            />
            <button onClick={handleDelete}>Delete</button>
          </ManualForm>
        ) : null}

        <TableContainer>
          <Table>
            <tbody>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Matric No.</th>
                <th>ID No.</th>
                <th>Course</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Sarah elizabeth Segun</td>
                <td>24/ENG01/022</td>
                <td>2455892992</td>
                <td>EEE323</td>
                <td>13:02</td>
                <td>10/01/22</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Sarah Segun</td>
                <td>24/ENG01/022</td>
                <td>2455892992</td>
                <td>EEE323</td>
                <td>13:02</td>
                <td>10/01/22</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Sarah Segun</td>
                <td>24/ENG01/022</td>
                <td>2455892992</td>
                <td>EEE323</td>
                <td>13:02</td>
                <td>10/01/22</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Sarah Segun</td>
                <td>24/ENG01/022</td>
                <td>2455892992</td>
                <td>EEE323</td>
                <td>13:02</td>
                <td>10/01/22</td>
              </tr>
            </tbody>
          </Table>
        </TableContainer>
      </Container>
    </AttendanceTable>
  );
}
