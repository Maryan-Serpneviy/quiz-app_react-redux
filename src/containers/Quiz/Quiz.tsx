import React, { Component } from 'react'
import ActiveQuiz from '~cm/ActiveQuiz'
import classes from './Quiz.module.scss'

export default class Quiz extends Component {
   state = {
      current: 0,
      quiz: [
         {
            question: 'What was a question?',
            answers: [
               { id: 1, text: 'Answer 1' },
               { id: 2, text: 'Answer 2' },
               { id: 3, text: 'Answer 3' },
               { id: 4, text: 'Answer 4' }
            ],
            correct: 2
         }
      ]
   }

   onAnswerClick = (id: number) => {
      console.log(id, typeof id)
   }
   
   render() {
      const { current, quiz } = this.state

      return (
         <div className={classes.Quiz}>
            <div className={classes.wrapper}>
               <h1>Quiz</h1>
               <ActiveQuiz
                  current={current + 1}
                  total={quiz.length}
                  question={quiz[0].question}
                  answers={quiz[0].answers}
                  onAnswerClick={this.onAnswerClick}
               />
            </div>
         </div>
      )
   }
}
