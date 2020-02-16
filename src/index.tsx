import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import App from './components/App'
import './index.scss'

const app = (
   <Router>
      <App />
   </Router>
)

ReactDOM.render(app, document.querySelector('#root'))
