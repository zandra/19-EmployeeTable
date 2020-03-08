import React, {useState} from "react";

export default function NameSearch() {
    // ## Name Search
  // initialize a state to hold the name
  const [nameSearch, setNameSearch] = useState("");
  // Handle filter input change
  function handleNameChange(e) {
    setNameSearch(e.target.value);
    // console.log(nameSearch);
  }



  function filterbyName(value) {
    const filterName = workingList.filter(n => n.name.first)
  }
  return null;
}