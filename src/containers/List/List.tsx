import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './List.module.scss'

export default class List extends Component {
   renderQuizes() {
      return [1, 2, 3].map((quiz, i) => (
         <li key={i}>
            <NavLink to={`/quiz/${quiz}`}>
               Test {quiz}
            </NavLink>
         </li>
      ))
   }

   render() {
      return (
         <div className={classes.quizlist}>
            <div>
               <h1>Quiz list</h1>

               <ul>
                  {this.renderQuizes()}
               </ul>
            </div>
         </div>
      )
   }
}
