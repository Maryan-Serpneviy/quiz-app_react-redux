import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from '@rest'
import Formic from '@lib/formic'
import Input from '@com/Input'
import Select from '@com/Select'
import Button from '@com/Button'
import classes from './Creator.module.scss'

@withRouter
export default class Creator extends Component {
   state = {
      quiz: {
         items: []
      },
      correct: 1,
      formControls: this.createFormControls(),
      isFormValid: false
   }

   render() {
      const { quiz, correct, isFormValid } = this.state

      return (
         <div className={classes.quizCreator}>
            <div>
               <h1>Quiz creation</h1>

               <div className={classes.count}>
                  Questions: {quiz.items.length}
               </div>

               <form onSubmit={e => e.preventDefault()}>
                  {this.renderInputs()}
                  
                  <Select
                     label="Provide the correct answer"
                     value={correct}
                     options={[
                        { text: 1, value: 1 },
                        { text: 2, value: 2 },
                        { text: 3, value: 3 },
                        { text: 4, value: 4 }
                     ]}
                     onChange={this.handleSelect}
                  />

                  <Button
                     type="primary"
                     disabled={!isFormValid}
                     onClick={this.addQuestion}
                  >
                     Add question
                  </Button>

                  <Button
                     type="success"
                     disabled={!quiz.items.length}
                     onClick={this.createQuiz}
                  >
                     Create quiz
                  </Button>
                  
                  {!isFormValid && (
                     <div className={classes.error}>Empty or repeating fields</div>
                  )}
               </form>
            </div>
         </div>
      )
   }

   renderInputs() {
      const { formControls } = this.state

      return Object.keys(formControls).map((controlName, index) => {
         const control = formControls[controlName]

         return (
            <React.Fragment key={index}>
               <Input
                  label={control.label}
                  value={control.value}
                  error={control.error}
                  isTouched={control.isTouched}
                  isValid={control.isValid}
                  shouldValidate={!!control.validation}
                  handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     this.handleChange(event.target.value, controlName)
                  }}
               />
               {index === 0 && <hr/>}
            </React.Fragment>
         )
      })
   }

   handleChange = (value: string, controlName: string) => {
      const formControls = { ...this.state.formControls }
      const control = { ...formControls[controlName] }

      control.value = value
      control.isTouched = true
      control.isValid = Formic.validate(control.value, control.validation)

      formControls[controlName] = control

      this.setState({
         formControls,
         isFormValid: Formic.validateForm(formControls)
      })
   }

   get quizName(): object {
      const name = {
         label: 'Provide the quiz name',
         error: 'Name is too short or contains digits'
      }
      if (this.state) { // state is initialized
         name.value = this.state.formControls.name.value
         name.isTouched = true
         name.isValid = true
      }
      return name
   }

   createFormControls(): object {
      return {
         question: Formic.createControl({
            label: 'Enter question',
            error: 'Question is too short'
         }, {
            required: true,
            minLength: 20
         }),
         option1: this.createOption(1),
         option2: this.createOption(2),
         option3: this.createOption(3),
         option4: this.createOption(4),
         name: Formic.createControl({ ...this.quizName }, {
            required: true,
            name: true,
            minLength: 8
         })
      }
   }

   createOption(next: number): object {
      return Formic.createControl({
         id: next,
         label: `Answer ${next}`,
         error: 'Cannot be empty'
      }, { required: true })
   }

   handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      this.setState({
         correct: Number(event.target.value)
      })
   }

   addQuestion = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      const {
         question,
         option1,
         option2,
         option3,
         option4,
         name
      } = this.state.formControls

      const items = this.state.quiz.items.concat() // create items copy
      const index = items.length + 1
      const questionItem = {
         question: question.value,
         id: index,
         correct: this.state.correct,
         answers: [
            { id: option1.id, text: option1.value },
            { id: option2.id, text: option2.value },
            { id: option3.id, text: option3.value },
            { id: option4.id, text: option4.value }
         ]
      }
      items.push(questionItem)

      this.setState({
         quiz: {
            name: name.value,
            items
         },
         correct: 1,
         isFormValid: false,
         formControls: this.createFormControls()
      })
   }

   createQuiz = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      try {
         const response = await Axios.post('quiz.json', this.state.quiz)
         this.setState({ // reset state
            quiz: {
               items: []
            },
            correct: 1,
            isFormValid: false,
            formControls: this.createFormControls()
         })
         if (response.statusText === 'OK') {
            this.props.history.push('/') // go to list
         }
      } catch (err) {
         console.error(err)
      }
   }
}
