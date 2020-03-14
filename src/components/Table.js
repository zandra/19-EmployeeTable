import React, {useState} from "react";
import "./Table.css";
import Table from'react-bootstrap/Table';
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function EmployeeTable(props) {

  // From https://www.florin-pop.com/blog/2019/07/sort-table-data-with-react/
  const [sort, setSort] = useState('default');

  const sortTypes = {
    up: {
      class: 'sort-up',
      fn: (a, b) => a.dob.age - b.dob.age
    },
    down: {
      class: 'sort-down',
      fn: (a, b) => b.dob.age - a.dob.age
    },
    default: {
      class: 'sort',
      fn: (a, b) => a
    }
  };

  const onSortChange = () => {
    if (sort === 'down') setSort('up');
    else if (sort === 'up') setSort('default');
    else if (sort === 'default') setSort('down');
  };

  return (
  <Table striped bordered>
    <thead>
      <tr>
        <th>Profile</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>DOB
          
        </th>
        <th>Age
          <button className="sort" onClick={onSortChange}>
            <FontAwesomeIcon icon={`${sortTypes[sort].class}`} />
          </button>
        </th>
        <th>Branch Location</th>
      </tr>
    </thead>
    <tbody>
    {[...props.users] // return a new object instead of changing the original
    .sort(sortTypes[sort].fn)
    .map(user => (
      <tr key={user.id}>
        <td>{ <img src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} className="img-fluid" /> }</td>
        <td>{ user.name.first }</td>
        <td>{ user.name.last }</td>
        <td>{ user.email }</td>
        <td>{ moment(user.dob.date).format('MMMM Do, YYYY') }</td>
        <td>{ user.dob.age }</td>
        <td>{ user.nat }</td>
        </tr>
     ))
    }  
    </tbody>
  </Table>
  )
}