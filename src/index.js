import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { StudentProvider } from './context/StudentContext'
import GlobalStyles from './styles/globalStyles'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <StudentProvider>
      <App />
    </StudentProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
