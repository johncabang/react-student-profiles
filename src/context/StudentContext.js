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

  // const fetchData = async () => {
  //   axios(url)
  //     .then((response) => {
  //       let newStudentList = []
  //       response.data.students.forEach((student) => {
  //         let addTag = student
  //         addTag.tags = []
  //         newStudentList.push(addTag)
  //       })
  //       setStudentsList(newStudentList)
  //       setFilteredStudentsList(newStudentList)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  useEffect(() => {
    async function fetchData() {
      const request = await axios(url)
      // .then((response) => {
      let newStudentList = []
      request.data.students.forEach((student) => {
        let addTag = student
        addTag.tags = []
        newStudentList.push(addTag)
      })
      setStudentsList(newStudentList)
      setFilteredStudentsList(newStudentList)
      // })
      // .catch((err) => {
      //   console.log(err)
      // })
    }
    fetchData()
  }, [])

  // Expand toggle to show grades

  const expandToggle = (index) => {
    if (showGrades === index) {
      return setShowGrades(null)
    }
    setShowGrades(index)
  }

  // Search filter by first & last name

  const filterName = (arr) => {
    return arr.filter(({ firstName, lastName }) =>
      [firstName, lastName].some(
        (name) =>
          name
            .toString()
            .toLowerCase()
            .indexOf(searchName.toLowerCase().trim()) > -1,
      ),
    )
  }

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
    // filterNameByTag,
    filteredStudentsList,
    setFilteredStudentsList,
  }

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  )
}

export { StudentContext, StudentProvider }
