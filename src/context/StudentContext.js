import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const StudentContext = createContext()

const StudentProvider = ({ children }) => {
  const [studentsList, setStudentsList] = useState([])
  const [filteredStudentsList, setFilteredStudentsList] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchTags, setSearchTags] = useState('')
  const [tags, setTags] = useState([])
  const [showGrades, setShowGrades] = useState(false)

  // API call

  const url = 'https://api.hatchways.io/assessment/students'

  useEffect(() => {
    axios(url)
      .then((response) => {
        let newStudentList = []
        response.data.students.forEach((student) => {
          let addTag = student
          addTag.tags = []
          newStudentList.push(addTag)
        })
        setStudentsList(newStudentList)
        setFilteredStudentsList(newStudentList)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // Expand toggle to show grades

  const expandToggle = (index) => {
    if (showGrades === index) {
      return setShowGrades(null)
    }
    setShowGrades(index)
  }

  // Search filter by first & last name

  // const filterName = (arr) => {
  //   return arr.filter(({ firstName, lastName }) =>
  //     [firstName, lastName].some(
  //       (name) =>
  //         name
  //           .toString()
  //           .toLowerCase()
  //           .indexOf(searchName.toLowerCase().trim()) > -1,
  //     ),
  //   )
  // }

  const filterName = (event) => {
    setSearchName(event.target.value)

    let results = []
    // if (!searchName) {
    //   setFilteredStudentsList(studentsList)
    //   console.log('This is !searchName ' + filteredStudentsList)
    // } else {
    results = studentsList.filter((item) => {
      return (
        item.firstName
          .toString()
          .toLowerCase()
          .indexOf(searchName.toLowerCase().trim()) > -1 ||
        item.lastName
          .toString()
          .toLowerCase()
          .indexOf(searchName.toLowerCase().trim()) > -1
      )
    })
    setFilteredStudentsList(results)
    console.log(filteredStudentsList)
    // }
  }

  // Search filter by tags - TODOS

  const filterNameByTag = (event) => {
    setSearchTags(event.target.value)

    let results = []
    results = studentsList.filter((item) => {
      return item.tags
        .toString()
        .toLowerCase()
        .includes(searchTags.toLowerCase().trim())
    })
    setFilteredStudentsList(results)
    console.log(filteredStudentsList)
  }

  // const filterNameByTag = (event) => {
  //   setSearchTags(event.target.value)

  //   let results = []
  //   if (!searchTags) {
  //     setFilteredStudentsList(studentsList)
  //     console.log('This is !searchTags ' + filteredStudentsList)
  //   } else {
  //     results = studentsList.filter((item) => {
  //       return item.tags
  //         .toString()
  //         .toLowerCase()
  //         .includes(searchTags.toLowerCase().trim())
  //     })
  //     setFilteredStudentsList(results)
  //     console.log(filteredStudentsList)
  //   }
  // }

  // setSearchTags(event.trim())

  // let results = []
  // results = studentsList.filter(({ tags }) =>
  //   [tags].some(
  //     (tag) =>
  //       tag
  //         .toString()
  //         .toLowerCase()
  //         .indexOf(searchTags.toLowerCase().trim()) > -1,
  //   ),
  // )

  // setFilteredStudentsList(results)

  // const filterNameByTag = (event) => {
  //   setSearchTags(event)

  //   let results = []
  //   results = studentsList.filter((student) => {
  //     return (
  //       student
  //         .toString()
  //         .toLowerCase()
  //         .includes(searchTags.toLowerCase().trim()),
  //       setFilteredStudentsList(results)
  //     )
  //   })
  // }

  // Add tag

  const addTag = (str, index) => {
    const tagForStudentsList = [...studentsList]
    tagForStudentsList[index].tags.push(str)
    setStudentsList(tagForStudentsList)
  }

  const value = {
    searchName,
    setSearchName,
    searchTags,
    setSearchTags,
    tags,
    setTags,
    showGrades,
    setShowGrades,
    expandToggle,
    studentsList,
    setStudentsList,
    filterName,
    addTag,
    filterNameByTag,
    filteredStudentsList,
  }

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  )
}

export { StudentContext, StudentProvider }
