import React, { useContext } from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'

import { StudentContext } from '../../context/StudentContext'
import SearchInputs from '../SearchInputs'
import Tags from '../Tags'

const StudentsCard = () => {
  const {
    showGrades,
    expandToggle,
    filterName,
    filteredStudentsList,
  } = useContext(StudentContext)

  return (
    <Container>
      <SearchInputs />
      {filterName(filteredStudentsList).map((student, index) => {
        return (
          <Wrapper key={student.id}>
            <Avatar src={student.pic} alt="student pic" />
            <Card>
              <Header>
                <h1>
                  {student.firstName} {student.lastName}
                </h1>
                <ExpandGrades onClick={() => expandToggle(index)}>
                  {showGrades === index ? <FaMinus /> : <FaPlus />}
                </ExpandGrades>
              </Header>
              <Body>
                <p>Email: {student.email}</p>
                <p>Company: {student.company}</p>
                <p>Skill: {student.skill}</p>
                <p>
                  Average:{' '}
                  {student.grades
                    .map((i) => Number(i))
                    .reduce((a, b) => a + b, 0) / student.grades.length}
                  %
                </p>
                {showGrades === index && (
                  <GradesWrapper>
                    {student.grades.map((grade, index) => (
                      <p key={index}>
                        Test {index + 1}: {grade}%
                      </p>
                    ))}
                  </GradesWrapper>
                )}
                <Tags index={index} tags={student.tags} />
              </Body>
            </Card>
          </Wrapper>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 830px;
  height: 575px;
  border: 0rem 1.5rem;
  border-radius: 0.7rem;
  overflow-y: auto;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const ExpandGrades = styled.div`
  font-size: 2rem;
  cursor: pointer;
  color: #b7b7b7;
  display: flex;
  align-items: center;
`

const GradesWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  display: flex;
  border-bottom: #b7b7b7 solid 1px;
  padding: 1.5rem;
`

const Avatar = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  border: #b7b7b7 solid 1px;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: left;
  margin: 0;
  padding: 1rem 1.5rem 0rem 1.5rem;
`

export default StudentsCard
