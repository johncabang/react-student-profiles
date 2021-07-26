import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000;
  max-width: 1440px;
  font-family: 'Raleway', sans-serif;
}

body { 
  background-color: #ededed;
  height: 100vh;
}

h1 {
  font-size: 3rem;
  text-transform: uppercase;
}

h4 {
  font-size: 1.5rem;
  font-weight: normal;
  color: #b7b7b7;
}

`

export default GlobalStyles
