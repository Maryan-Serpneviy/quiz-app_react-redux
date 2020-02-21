import React, { Component } from 'react'
import Axios from '@rest'
import Loader from '@com/Loader'
import ActiveQuiz from '@com/ActiveQuiz'
import CompletedQuiz from '@com/CompletedQuiz'
import classes from './Quiz.module.scss'

export default class Quiz extends Component {
   state = {
      current: 0,
      answerStatus: null,
      completed: false,
      results: [],
      quiz: [],
      isLoading: true
   }

   render() {
      const {
         isLoading,
         current,
         quiz,
         answerStatus,
         completed,
         results
      } = this.state

      return (
         <div className={classes.Quiz}>
            <div className={classes.wrapper}>
               <h1>Quiz</h1>

               {isLoading && <Loader />}

               {!isLoading && !completed && <ActiveQuiz
                  current={current + 1}
                  total={quiz.length}
                  question={quiz[current].question}
                  answers={quiz[current].answers}
                  onAnswerClick={this.onAnswerClick}
                  status={answerStatus}
               />}

               {!isLoading && completed && (
                  <CompletedQuiz
                     quiz={quiz}
                     results={results}
                     restartQuiz={this.restartQuiz}
               />)}
            </div>
         </div>
      )
   }

   async componentDidMount() {
      try {
         const response = await Axios.get(`quiz/${this.props.match.params.id}.json`)
         this.setState({
            quiz: response.data,
            isLoading: false
         })
      } catch (err) {
         console.error(err)
      }
   }

   onAnswerClick = (id: number) => {
      const { current, quiz, answerStatus, results } = this.state

      if (answerStatus) { // exclude bug if multiple clicks
         const key = Object.keys(answerStatus)[0]
         if (answerStatus[key] === 'correct') {
            return
         }
      }

      this.useDelay()

      // updating results
      const question = quiz[current]
      if (question.correct === id) {
         this.setState({
            answerStatus: { [id]: 'correct' },
            results: [...results, 'correct']
         })
      } else {
         this.setState({
            answerStatus: { [id]: 'incorrect' },
            results: [...results, 'incorrect']
         })
      }
   }

   useDelay() {
      const timeout = window.setTimeout(() => {
         if (this.isQuizCompleted()) {
            this.setState({ completed: true })
         } else {
            this.setState({
               current: this.state.current + 1,
               answerStatus: null
            })
         }
         window.clearTimeout(timeout)
      }, 1000)
   }

   isQuizCompleted(): boolean {
      const { current, quiz } = this.state
      return current + 1 === quiz.length
   }

   restartQuiz = () => {
      this.setState({
         current: 0,
         answerStatus: null,
         completed: false,
         results: []
      })
   }
}
