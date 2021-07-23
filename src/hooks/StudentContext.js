import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const StudentContext = createContext();

const StudentProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTags, setSearchTags] = useState("");

  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [showGrades, setShowGrades] = useState(false);

  const expandToggle = () => {
    setShowGrades(!showGrades);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInputTag = inputTag.trim();

    if (key === "Enter") {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInputTag]);
      setInputTag("");
    }
  };

  const url = "https://api.hatchways.io/assessment/students";

  const [studentsList, setStudentsList] = useState([]);

  useEffect(() => {
    axios(url)
      .then((response) => {
        setStudentsList(response.data.students);
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
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

export { StudentContext, StudentProvider };
