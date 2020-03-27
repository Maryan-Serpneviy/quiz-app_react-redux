import React, { useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchQuizes, setQuizName } from '@s/actions/quiz'
import { IQuizName } from '@/interfaces'
import LoaderSm from '@com/LoaderSm'
import classes from './List.module.scss'

type Props = {
   isLoading: boolean
   quizList: Array<IQuizName>
   fetchQuizes: () => Promise<object>
   setQuizName: (name: string) => void
}

const List: React.FC<Props> = (
   // eslint-disable-next-line no-shadow
   { isLoading, quizList, fetchQuizes, setQuizName } :
   InferProps<typeof List.propTypes>) => {

   useEffect(() => {
      fetchQuizes()
   }, [])

   return (
      <div className={classes.quizlist}>
         <div>
            <h1>Quiz list</h1>

            {isLoading && <LoaderSm/>}
            {!isLoading && (
               <ul>
                  {quizList.map((quiz: { id: number, name: string }) => (
                     <li key={quiz.id}>
                        <NavLink to={`/quiz/${quiz.id}`} onClick={() => setQuizName(quiz.name)}>
                           {quiz.name}
                        </NavLink>
                     </li>
                  ))}
               </ul>
            )}
            {!isLoading && !quizList.length && (
               <Link to="/creator" className={classes.createQuiz}>
                  Create quiz
               </Link>
            )}
         </div>
      </div>
   )
}

List.propTypes = {
   isLoading: PropTypes.bool.isRequired,
   quizList: PropTypes.array.isRequired,
   fetchQuizes: PropTypes.func.isRequired,
   setQuizName: PropTypes.func.isRequired
}

const mapStateToProps = (state: { quiz: Props }) => ({
   isLoading: state.quiz.isLoading,
   quizList: state.quiz.quizList
})

const mapDispatchToProps = (dispatch: any) => ({
   fetchQuizes: () => dispatch(fetchQuizes()),
   setQuizName: (name: string) => dispatch(setQuizName(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
