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

  const fetchData = async () => {
    try {
      const request = await axios(url)
      let newStudentList = []
      request.data.students.forEach((student) => {
        let addTag = student
        addTag.tags = []
        newStudentList.push(addTag)
      })
      setStudentsList(newStudentList)
      setFilteredStudentsList(newStudentList)
    } catch (error) {
      console.log('error', error)
      // console.log(error.response.data)
      // console.log(error.response.status)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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

  // Search filter by tags - TODOS - FIX state render

  const filterNameByTag = (event) => {
    setSearchTags(event.target.value)
    const results = studentsList.filter((item) => {
      return (
        item.tags
          .toString()
          .toLowerCase()
          .indexOf(searchTags.toLowerCase().trim()) > -1
      )
    })
    setFilteredStudentsList(results)
    console.log(filteredStudentsList)
    // console.log(searchTags)
  }

  // useEffect(() => {
  //   console.log(searchTags)
  // }, [searchTags])

  // Add tag

  const addTag = (str, index) => {
    const tagForStudentsList = [...studentsList]
    tagForStudentsList[index].tags.push(str)
    setStudentsList(tagForStudentsList)
  }

  // Expand toggle to show grades

  const expandToggle = (index) => {
    if (showGrades === index) {
      return setShowGrades(null)
    }
    setShowGrades(index)
  }

  const value = {
    studentsList,
    setStudentsList,
    filteredStudentsList,
    setFilteredStudentsList,
    searchName,
    setSearchName,
    searchTags,
    setSearchTags,
    showGrades,
    setShowGrades,
    tags,
    setTags,
    expandToggle,
    addTag,
    filterName,
    filterNameByTag,
  }

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  )
}

export { StudentContext, StudentProvider }
