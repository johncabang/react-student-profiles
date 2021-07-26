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

p {
  @media screen and (max-width: 1024px) {
    transition: ease-in 0.5s;
    font-size: 0.8rem;
  }
}

body { 
  background-color: #ededed;
  height: 100vh;
}

h1 {
  font-size: 3rem;
  text-transform: uppercase;
  transition: ease-in 0.5s;

  @media screen and (max-width: 1024px) {
    transition: ease-in 0.5s;
    font-size: 2rem;
  }

  @media screen and (max-width: 414px) {
    font-size: 1.5rem;
    text-align: center;

  }
}

`

export default GlobalStyles
