import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Axios from 'axios'
import Loader from '~cm/Loader'
import classes from './List.module.scss'

export default class List extends Component {
   state = {
      quiz: [],
      isLoading: true
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

   async componentDidMount() {
      try {
         const response = await Axios.get('https://quiz-app-react-85b48.firebaseio.com/quiz.json')
         const quiz = Object.keys(response.data).map((key, index) => {
            return {
               id: key,
               name: `Quiz #${index + 1}`
            }
         })

         this.setState({ quiz, isLoading: false })
      } catch (err) {
         console.error(err)
      }
   }

   render() {
      const { isLoading } = this.state

      return (
         <div className={classes.quizlist}>
            <div>
               <h1>Quiz list</h1>

               {!isLoading && <Loader/>}
               {isLoading && (
                  <ul>
                     {this.renderQuizes()}
                  </ul>
               )}
               
            </div>
         </div>
      )
   }
}
