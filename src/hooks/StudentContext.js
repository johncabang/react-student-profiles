import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const StudentContext = createContext()

const StudentProvider = ({ children }) => {
  const [studentsList, setStudentsList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchTags, setSearchTags] = useState('')
  const [tags, setTags] = useState([])
  // const [inputTag, setInputTag] = useState('')
  const [showGrades, setShowGrades] = useState(false)

  // Expand toggle to show grades

  const expandToggle = (index) => {
    if (showGrades === index) {
      return setShowGrades(null)
    }
    setShowGrades(index)
  }

  // Search filter by first & last name

  const searchName = (arr) => {
    return arr.filter(({ firstName, lastName, tags }) =>
      [firstName, lastName, tags].some(
        (name) =>
          name.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
      ),
    )
  }

  // Search filter by tags - TODOS

  // Add tags

  const addTags = (str, index) => {
    const tagForStudentsList = [...studentsList]
    tagForStudentsList[index].tags.push(str)
    setStudentsList(tagForStudentsList)
  }

  // API call

  const url = 'https://api.hatchways.io/assessment/students'

  useEffect(() => {
    axios(url)
      .then((response) => {
        let newStudentList = []
        // eslint-disable-next-line
        response.data.students.map((student) => {
          let addTags = student
          addTags.tags = []
          newStudentList.push(addTags)
        })
        setStudentsList(newStudentList)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const value = {
    searchTerm,
    setSearchTerm,
    searchTags,
    setSearchTags,
    tags,
    setTags,
    // inputTag,
    // setInputTag,
    showGrades,
    setShowGrades,
    expandToggle,
    studentsList,
    setStudentsList,
    searchName,
    addTags,
  }

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  )
}

export { StudentContext, StudentProvider }
