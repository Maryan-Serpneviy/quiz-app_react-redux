import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@s/storeConfig'
import App from './components/App'
import './index.scss'

const app = (
   <Provider store={store}>
      <Router>
         <App />
      </Router>
   </Provider>
)

ReactDOM.render(app, document.querySelector('#root'))
