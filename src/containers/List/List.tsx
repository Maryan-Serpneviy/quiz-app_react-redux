import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Axios from '@rest'
import Loader from '@com/Loader'
import classes from './List.module.scss'

export default class List extends Component {
   state = {
      isLoading: true,
      quiz: []
   }

   renderQuizes() {
      return this.state.quiz.map(quiz => (
         <li key={quiz.id}>
            <NavLink to={`/quiz/${quiz.id}`}>
               {quiz.name}
            </NavLink>
         </li>
      ))
   }

   render() {
      const { isLoading, quiz } = this.state

      return (
         <div className={classes.quizlist}>
            <div>
               <h1>Quiz list</h1>

               {isLoading && <Loader/>}
               {!isLoading && (
                  <ul>
                     {this.renderQuizes()}
                  </ul>
               )}
               {!isLoading && !quiz.length && (
                  <Link to="/creator" className={classes.createQuiz}>
                     Create quiz
                  </Link>
               )}
            </div>
         </div>
      )
   }

   async componentDidMount() {
      try {
         const response = await Axios.get('quiz.json')
         const quiz = Object.keys(response.data).map((key, index) => {
            return {
               id: key,
               name: `Quiz #${index + 1}`
            }
         })
         this.setState({ quiz, isLoading: false })
      } catch (err) {
         this.setState({ quiz: [], isLoading: false })
      }
   }
}
