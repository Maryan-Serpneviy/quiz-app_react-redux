import React, { useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { connect } from 'react-redux'
import * as Action from '@s/actions/quiz'
import { QuestionType } from '@s/reducers/quiz'
import LoaderSm from '@com/LoaderSm'
import ActiveQuiz from './ActiveQuiz'
import CompletedQuiz from './CompletedQuiz'
import classes from './Quiz.module.scss'

type Props = {
   isLoading: boolean
   quiz: Array<QuestionType>
   current: number
   answerStatus: null | object
   completed: boolean
   results: object[]
   fetchQuiz: (id: string) => void
   onAnswerClick: (id: number) => void
   restartQuiz: () => void
}

const Quiz: React.FC<Props> = (
   {
      isLoading,
      quiz,
      current,
      completed,
      fetchQuiz,
      restartQuiz,
      ...props
   }: InferProps<typeof Quiz.propTypes>) => {
   
   useEffect(() => {
      fetchQuiz(props.match.params.id)

      return () => {
         restartQuiz()
      }
   }, [])
   
   return (
      <div className={classes.Quiz}>
         <div className={classes.wrapper}>
            <h1>Quiz</h1>

            {isLoading && <LoaderSm />}

            {!isLoading && !completed && quiz.length && <ActiveQuiz
               current={current + 1}
               total={quiz.length}
               question={quiz[current].question}
               answers={quiz[current].answers}
               onAnswerClick={props.onAnswerClick}
               status={props.answerStatus}
            />}

            {!isLoading && completed && (
               <CompletedQuiz
                  quiz={quiz}
                  results={props.results}
                  restartQuiz={restartQuiz}
            />)}
         </div>
      </div>
   )
}

Quiz.propTypes = {
   isLoading: PropTypes.bool.isRequired,
   quiz: PropTypes.array.isRequired,
   current: PropTypes.number.isRequired,
   answerStatus: PropTypes.object,
   completed: PropTypes.bool.isRequired,
   results: PropTypes.array.isRequired,
   fetchQuiz: PropTypes.func.isRequired,
   onAnswerClick: PropTypes.func.isRequired,
   restartQuiz: PropTypes.func.isRequired
}

const mapStateToProps = (state: { quiz: Props }) => ({
   isLoading: state.quiz.isLoading,
   quiz: state.quiz.quiz,
   current: state.quiz.current,
   answerStatus: state.quiz.answerStatus,
   completed: state.quiz.completed,
   results: state.quiz.results
})

const mapDispatchToProps = (dispatch: Action) => ({
   fetchQuiz: (id: string) => dispatch(Action.fetchQuiz(id)),
   onAnswerClick: (id: number) => dispatch(Action.onAnswerClick(id)),
   restartQuiz: () => dispatch(Action.restartQuiz())
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
