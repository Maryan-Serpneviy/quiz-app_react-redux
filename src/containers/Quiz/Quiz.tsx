import React, { Component } from 'react'
import ActiveQuiz from '~cm/ActiveQuiz'
import classes from './Quiz.module.scss'

export default class Quiz extends Component {
   state = {
      current: 0,
      answerStatus: null,
      quiz: [
         {
            id: 1,
            question: 'What was a question?',
            answers: [
               { id: 1, text: 'Answer 1' },
               { id: 2, text: 'Answer 2' },
               { id: 3, text: 'Answer 3' },
               { id: 4, text: 'Answer 4' }
            ],
            correct: 2
         },
         {
            id: 2,
            question: 'What was a question again?',
            answers: [
               { id: 1, text: 'Option 1' },
               { id: 2, text: 'Option 2' },
               { id: 3, text: 'Option 3' },
               { id: 4, text: 'Option 4' }
            ],
            correct: 3
         }
      ]
   }

   onAnswerClick = (id: number) => {
      const { current, quiz, answerStatus } = this.state

      if (answerStatus) { // exclude bug if multiple clicks
         const key = Object.keys(answerStatus)[0]
         if (answerStatus[key] === 'correct') {
            return
         }
      }

      const question = quiz[current]
      if (question.correct === id) {
         this.setState({
            answerStatus: {
               [id]: 'correct'
            }
         })
      } else {
         this.setState({
            answerStatus: {
               [id]: 'incorrect'
            }
         })
      }
      const timeout = window.setTimeout(() => {
         if (this.isQuizCompleted()) {
            console.log('completed')
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
   
   render() {
      const { current, quiz, answerStatus } = this.state

      return (
         <div className={classes.Quiz}>
            <div className={classes.wrapper}>
               <h1>Quiz</h1>
               <ActiveQuiz
                  current={current + 1}
                  total={quiz.length}
                  question={quiz[current].question}
                  answers={quiz[current].answers}
                  onAnswerClick={this.onAnswerClick}
                  status={answerStatus}
               />
            </div>
         </div>
      )
   }
}
