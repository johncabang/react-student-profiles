import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const StudentContext = createContext();

const StudentProvider = ({ children }) => {
  const [studentsList, setStudentsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [showGrades, setShowGrades] = useState(false);

  // Expand toggle to show grades

  // const expandToggle = () => {
  //   setShowGrades(!showGrades);
  // };

  const expandToggle = index => {
    if (showGrades === index) {
      return setShowGrades(null);
    }

    setShowGrades(index);
  };

  // Search filter by first & last name

  const searchName = (rows) => {
    return rows.filter(({ firstName, lastName }) =>
      [firstName, lastName].some(
        (name) =>
          name.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      )
    );
  };

  // Add tags

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInputTag = inputTag.trim();

    if (key === "Enter") {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInputTag]);
      // addTags(tags);
      setInputTag("");
    }
  };

  // const addTags = (str) => {
  //   const tagForStudentsList = [...studentsList];
  //   tagForStudentsList.tags.push(str);
  //   setStudentsList(tagForStudentsList);
  // };

  // API call

  const url = "https://api.hatchways.io/assessment/students";

  useEffect(() => {
    axios(url)
      .then((response) => {
        let newStudentList = [];
        // eslint-disable-next-line
        response.data.students.map(student => {
          let addTags = student;
          addTags.tags = [];
          newStudentList.push(addTags);
        });
        // console.log(newStudentList)
        setStudentsList(newStudentList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(studentsList);

  const value = {
    searchTerm,
    setSearchTerm,
    searchTags,
    setSearchTags,
    tags,
    setTags,
    inputTag,
    setInputTag,
    showGrades,
    setShowGrades,
    expandToggle,
    onKeyDown,
    studentsList,
    setStudentsList,
    searchName,
    // addTags
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

export { StudentContext, StudentProvider };
