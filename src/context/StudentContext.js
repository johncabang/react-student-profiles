import React, { useState, useEffect, createContext, useMemo } from 'react'
import axios from 'axios'

const StudentContext = createContext()

const StudentProvider = ({ children }) => {
  const [studentsList, setStudentsList] = useState([])
  const [updatedStudentsList, setUpdatedStudentsList] = useState([])
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
      setUpdatedStudentsList(newStudentList)
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

  // Search filter by tags

  const filteredStudents = useMemo(() => {
    if (!searchTags) return updatedStudentsList
    return updatedStudentsList.filter((item) => {
      return item.tags
        .toString()
        .toLowerCase()
        .includes(searchTags.toLowerCase().trim())
    })
  }, [searchTags, updatedStudentsList])

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
    filteredStudents,
  }

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  )
}

export { StudentContext, StudentProvider }
