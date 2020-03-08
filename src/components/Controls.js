import React, {useState, useEffect} from "react";
import axios from "axios";
import moment from "moment";
import "./Controls.css";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import Select from 'react-select';
import Hero from "./Hero";
import EmployeeTable from "./Table";
import InputGroup from'react-bootstrap/InputGroup';
import FormControl from'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button'
import json from '../data/results.json';
const url = "https://randomuser.me/api/?results=10&inc=name,email,dob,nat&nat=AU,DE,ES,FR,GB,NZ,US";

// Question: should i break down the user object?
export default function Controls(){

  // Set masterList : axios call
  // Set workingList : display 
  const [masterList, setMasterList] = useState([]);
  const [workingList, setWorkingList] = useState(json);

  // ###### AXIOS call => setMasterList
  // useEffect(() => {
  //   axios.get(url)
  //   .then((res) => {
  //     const results = res.data.results;
  //     // Give each object an ID
  //     const updatedResults = results.map(obj => ({id: (results.indexOf(obj)+1), ...obj}));
  //     setMasterList(updatedResults);
  //     setWorkingList(masterList);
  //   })
  //   .catch(err => console.log(err))
  // }, []);
  // ########

  // ####### Filter and Search functions
  // ## DOB Filter
  const [dobLow, setDobLow] = useState("");
  const [dobHigh, setDobHigh] = useState("");

  const dateformat = (d) => moment(d).format('L');

  useEffect(() => {
    const filterDobLow = workingList.filter(emp => dateformat(emp.dob.date) >= dateformat(dobLow));
    setWorkingList(filterDobLow);
  }, [dobLow]);

  
  // ## Nationality Filter 
  const [nat, setNat] = useState({});
  // Object for Select, 
  const natOpts = [
    { value: "AU", label: "Australia" },
    { value: "DE", label: "Germany"},
    { value: "ES", label: "Spain"},
    { value: "FR", label: "France"},
    { value: "GB", label: "Great Britain"},
    { value: "NZ", label: "New Zealand"},
    { value: "US", label: "United States"}
  ];

  function filterNationality(value) {
    // if no data return users
    const filterNat = workingList.filter(emp => emp.nat === value);
    setWorkingList(filterNat);
  }

  // ## Reset Filter
  // Set workingList back to masterList
  // Clear all inputs

  return (
    <div className="page">
      <Hero />
      <div className="controls">
      <InputGroup className="mb-3" id="control-dob-filter">
        <InputGroup.Prepend>
          <InputGroup.Text>DOB</InputGroup.Text>
        </InputGroup.Prepend>
      <DayPickerInput 
        id="dobLow" 
        onDayChange={day => setDobLow(day)} 
      />
      <DayPickerInput id="dobHigh" onDayChange={day => setDobHigh(day)} />

     
      </InputGroup>
        {/* Nationality Filter  */}
        <InputGroup className="mb-3" id="natFilter">
          <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">Location</InputGroup.Text>
            </InputGroup.Prepend>
            <Select
              onChange={setNat}
              options={natOpts}
              placeholder="Select country"
              id="natSelect"
            />
        </InputGroup>
          <Button className="button" onClick={() => filterNationality("FR")}>Filter</Button>
          <Button className="button" onClick={() => setWorkingList(json)}>Reset Filters</Button>
      </div>
      {/* Table */}
      <EmployeeTable 
      users={workingList}
      />
      
      <div>
        <h5>Test Me</h5>
        <div>{JSON.stringify(workingList)}</div>
      </div>
    
      </div>
  )
}