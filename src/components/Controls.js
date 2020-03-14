import React, {useState, useEffect} from "react";
import axios from "axios";
import moment from "moment";
import "./Controls.css";
import EmployeeTable from "./Table";
// External React components
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import Select from 'react-select';
// React Bootstrap components
import { Container, Col, Row, InputGroup, FormControl, Button } from 'react-bootstrap';
// API url
const url = "https://randomuser.me/api/?results=100&inc=picture,name,email,dob,nat&nat=AU,DE,ES,FR,GB,NZ,US";

// Question: should i break down the user object?
export default function Controls(){

  // Set masterList : axios call
  // Set workingList : display 
  const [masterList, setMasterList] = useState([]);
  const [workingList, setWorkingList] = useState([]);
  
  // ###### AXIOS call => setMasterList
  useEffect(() => {
     axios.get(url)
    .then((res) => {
      const results = res.data.results;
      // Give each object an ID
      const updatedResults = results.map(obj => ({id: (results.indexOf(obj)+1), ...obj}));
      setMasterList(updatedResults);
      })
    .catch(err => console.log(err));
  }, []);

  // set working list 
  useEffect(() => {
    setWorkingList(masterList);
  }, [masterList])
  // ########

    // ## Reset Filter
    const resetFilter = () => {
      setWorkingList(masterList);
    }
    // Set workingList back to masterList
    // Clear all inputs

  // ####### Filter and Search functions
  // ## DOB Filter
  const [dobLow, setDobLow] = useState(null);
  const [dobHigh, setDobHigh] = useState(null);

  const dateformat = (d) => moment(d).format('L');

  // useEffect(() => {
  //   if (!dobLow) return;
  //   const filterDobLow = workingList.filter(emp => dateformat(emp.dob.date) >= dateformat(dobLow));
  //   setWorkingList(filterDobLow);
  // }, [dobLow]);

  
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

  useEffect(() => {
    if (Object.entries(nat).length === 0) return;
    const filterNat = workingList.filter(emp => emp.nat === nat.value);
    setWorkingList(filterNat);
  }, [nat]);


  return (
      <div className="control">
        <Container fluid="true">
          <Row className="align-items-center control-filters">
            <Col md={2}><h5>Filters</h5></Col>

            {/* DOB Filters  */}
            {/* <Col md="auto">
              <InputGroup className="mb-3 mt-3 ctrl-filter" id="ctrlDobFilter">
                <InputGroup.Prepend>
                  <InputGroup.Text>DOB</InputGroup.Text>
                </InputGroup.Prepend>
                <DayPickerInput 
                  id="dobLow" 
                  onDayChange={day => setDobLow(day)} 
                />
                <DayPickerInput 
                  id="dobHigh" 
                  onDayChange={day => setDobHigh(day)} />
              </InputGroup>
            </Col> */}
            <Col>
              {/* Nationality Filter  */}
              <InputGroup className="mb-3 mt-3 ctrl-filter" id="ctrlNatFilter">
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
            </Col>
            <Col>
              <Button className="button" onClick={() => resetFilter()}>Reset Filters</Button>
            </Col>
        </Row>
        </Container>
      {/* Table */}
      <EmployeeTable 
      users={workingList}
      />
    </div>
  )
}