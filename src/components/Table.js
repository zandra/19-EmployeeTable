import React from "react";
import "./Table.css";
import Table from'react-bootstrap/Table';
import moment from "moment";

// Table Head -> add click event to th to order by
// tr needs id, grab <tr> when ordering

export default function EmployeeTable(props) {


  return (
  <Table striped bordered>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>DOB</th>
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
    {props.users.map(user => (
      <tr key={props.id}>
        <td >{user.name.first}</td>
        <td >{user.name.last}</td>
        <td >{user.email}</td>
        <td >{moment(user.dob.date).format('MMMM Do YYYY')}</td>
        <td >{user.dob.age}</td>
        </tr>
     ))
    }  
    </tbody>
  </Table>
  )
}