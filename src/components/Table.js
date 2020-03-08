import React, {useState} from "react";
import "./Table.css";
import Table from'react-bootstrap/Table';
import moment from "moment";

// Table Head -> add click event to th to order by
// tr needs id, grab <tr> when ordering

export default function EmployeeTable(props) {

  const [sort, setSort] = useState(null);

  // const sortTypes(col) = {
  //   up: {
  //     class: 'sort-up',
  //     fn: (a, b) => a.col - b.col
  //   },
  //   down: {
  //     class: 'sort-down',
  //     fn: (a, b) => b.col - a.col
  //   },
  //   default: {
  //     class: 'sort',
  //     fn: (a, b) => a
  //   }
  // };

  // const sortChange() => {
  //   const currentSort = sort;
  //   let nextSort;
  //   if(currentSort === 'down') nextSort = 'up';

  // }

  // Table head DOB -> Sort Descending
  const orderByDobOldest= () => {
  }

  // Table head DOB -> Sort Descending
  const orderByAge= () => {
  }
    
  orderByDobOldest();


  return (
  <Table striped bordered>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>DOB
          <button>

          </button>
        </th>
        <th>Age</th>
        <th>Branch Location</th>
      </tr>
    </thead>
    <tbody>
    {props.users.map(user => (
      <tr key={user.id}>
        <td >{user.name.first}</td>
        <td >{user.name.last}</td>
        <td >{user.email}</td>
        <td >{moment(user.dob.date).format('MMMM Do, YYYY')}</td>
        <td >{user.dob.age}</td>
        <td>{user.nat}</td>
        </tr>
     ))
    }  
    </tbody>
  </Table>
  )
}