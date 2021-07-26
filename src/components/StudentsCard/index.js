import React, { useContext } from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'

import { StudentContext } from '../../context/StudentContext'
import SearchInputs from '../SearchInputs'
import Tags from '../Tags'

const StudentsCard = () => {
  const { showGrades, expandToggle, filterName, filteredStudents } = useContext(
    StudentContext,
  )

  return (
    <Container>
      <SearchInputs />
      {filterName(filteredStudents).map((student, index) => {
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

  @media screen and (max-width: 1024px) {
    width: 90%;
    height: 90%;
    transition: ease-in 0.5s;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 414px) {
    flex-direction: column;
    justify-content: center;
    transition: ease-in 0.5s;
  }
`

const ExpandGrades = styled.div`
  font-size: 2rem;
  cursor: pointer;
  color: #b7b7b7;
  display: flex;
  align-items: center;

  @media screen and (max-width: 414px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 1rem;
    margin: 1rem 0rem;
    transition: ease-in 0.5s;
  }
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

  @media screen and (max-width: 414px) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    transition: ease-in 0.5s;
  }
`

const Avatar = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  border: #b7b7b7 solid 1px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  @media screen and (max-width: 414px) {
    display: flex;
    justify-content: center;
    transition: ease-in 0.5s;
    margin: 0 auto;
    margin-bottom: 2rem;
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;

  @media screen and (max-width: 414px) {
    margin: 0;
    transition: ease-in 0.5s;
  }
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
