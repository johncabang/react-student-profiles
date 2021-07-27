import React from 'react'
import styled from 'styled-components'

import StudentsCard from './components/StudentsCard'

function App() {
  return (
    <Container>
      <StudentsCard />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column-reverse;
  height: 100vh;
`

export default App
