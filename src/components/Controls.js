import React, {useState, useEffect} from "react";
import EmployeeTable from "./Table";
import axios from "axios";
import employees from '../data/resultsShort.json';

// Create function to set id for each user object
// For now id is on results array index
// add id into the users object?

// Also maybe need to break down the object here ?

export default function Controls(){

  const url = "https://randomuser.me/api/?results==3?inc=id,picture,name,email,dob,phone,gender,nat";
  const shortRes = "https://randomuser.me/api/?results==3?inc=id,name,email,dob";
  
  
  
  const [users, setUsers] = useState(employees.results);
  const id = users.map(user => users.indexOf(user));
  
  console.log(users);
  
  // Table head DOB -> Sort Descending
  const orderByDobOldest= () => {
    setUsers(users.sort((a, b) => a.dob.date - b.dob.date));
  }
  
  
  
  // AXIOS call to get / set Data
  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
    dob: "",
  });
  useEffect(() => {
    axios.get(shortRes)
    .then((res) => {
      const emp = ([...res]);
      console.log(emp);
      const id = emp.map(e => res.indexOf(e));
      // setData(res)
      console.log(id);
    })
    .catch(err => console.log(err))
  }, []);

  return (
    <div className="controls">
      <h1>Employee Table</h1>
      <EmployeeTable 
      users={users}
      id={id}
      />
    </div>
  )
}