import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as Action from '@s/actions/creator'
import { FormGroup, FormControl, Control, Validators } from '@lib/mforms'
import Input from '@com/Input'
import Select from '@com/Select'
import Button from '@com/Button'
import { MAX_OPTIONS } from '@/constants'
import classes from './Creator.module.scss'

type Props = {
   quiz: {
      name: string
      items: object[]
   }
   updateQuiz: (item: object, name: string) => void
   uploadQuiz: () => Promise<object>
}

type State = {
   form: { [key: string]: Control }
   isFormValid: boolean
   correct: number
}

@withRouter
class Creator extends Component<Props, State> {
   static propTypes = {
      quiz: PropTypes.object.isRequired,
      updateQuiz: PropTypes.func.isRequired,
      uploadQuiz: PropTypes.func.isRequired
   }

   state: Readonly<State> = {
      form: this.createForm(),
      correct: 1,
      isFormValid: false
   }

   createForm(): { [key: string]: Control } {
      return new FormGroup({
         name: new FormControl({ ...this.quizName }, [
            Validators.required,
            Validators.title,
            Validators.minLength(10),
            Validators.maxLength(25)
         ]),

         question: new FormControl({
            label: 'Question'
         }, [
            Validators.required,
            Validators.minLength(20),
            Validators.maxLength(100)
         ]),

         option1: this.createOption(1),
         option2: this.createOption(2)
      })
   }

   createOption(next: number): Control {
      return new FormControl({
         id: next,
         label: `Answer ${next}`
      }, [
         Validators.required,
         Validators.maxLength(50)
      ])
   }

   render() {
      const { correct, isFormValid } = this.state
      const { items } = this.props.quiz

      return (
         <div className={classes.quizCreator}>
            <div>
               <h1>Quiz creation</h1>

               <div className={classes.count}>
                  Questions: {items.length}
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
                     disabled={!this.props.quiz.items.length}
                     onClick={this.createQuiz}
                  >
                     Create quiz
                  </Button>

                  <Button
                     type="primary"
                     onClick={this.addOption}
                     disabled={this.optionsCount >= MAX_OPTIONS}
                  >
                     Add option
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
      const { controls } = this.state.form
      
      return Object.keys(controls).map((controlName: string, index) => {
         const control: Control = controls[controlName]

         return (
            <React.Fragment key={index}>
               <div style={{ position: 'relative' }}>
               <Input
                  label={control.label}
                  value={control.value}
                  touched={control.touched}
                  valid={control.valid}
                  shouldValidate={Boolean(control.validators)}
                  error={control.error}
                  errors={control.errors}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     this.handleChange(event.target.value, controlName)
                  }}
                  autofocus={controlName === 'question'}
               />
               {control.label.includes('Answer') && (
                  <Button type="delete" onMouseDown={() => this.removeOption(control.label)}>
                     &times;
                  </Button>
               )}
               </div>
               {index === 1 && <hr/>}
            </React.Fragment>
         )
      })
   }

   addOption = () => {
      const newOption = this.createOption(this.optionsCount + 1)
      this.state.form.controls[`option${this.optionsCount + 1}`] = newOption

      this.setState({ ...this.state })
   }

   removeOption = (label: string) => {
      const { controls } = this.state.form
      
      for (const control in controls) {
         if (controls.hasOwnProperty(control)) {
            if (controls[control].label === label) {
               delete controls[control]
            }
         }
      }
      
      this.setState({ ...this.state })
   }

   handleChange = (value: string, controlName: string): void => {
      const { form } = this.state
      const control = form.controls[controlName]
      control.value = value

      control.validate()
      form.validate()

      this.setState({
         form,
         isFormValid: form.valid
      })
   }

   get optionsCount() {
      const { controls } = this.state.form
      return (Object.keys(controls).filter(control => control.includes('option')).length)
   }

   get quizName(): Control {
      const name: Control = {
         label: 'Provide the quiz name'
      }
      if (this.state) { // state is initialized
         name.value = this.state.form.controls.name.value
         name.touched = true
         name.valid = true
      }
      return name
   }

   handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      this.setState({
         correct: Number(event.target.value)
      })
   }

   addQuestion = (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault()

      const { question, name } = this.state.form.controls
      
      const options: Array<FormControl> = [] // filtering options
      Object.entries(this.state.form.controls).filter(control => {
         if (control[0].includes('option')) {
            options.push(control[1])
         }
      })
      
      const answers = options.map(option => ({
         id: option.id,
         text: option.value
      }))

      const questionItem = {
         question: question.value,
         id: this.props.quiz.items.length + 1,
         correct: this.state.correct,
         answers
      }

      this.props.updateQuiz(questionItem, name.value)
      this.resetState()
   }

   createQuiz = async (event: React.MouseEvent<HTMLButtonElement>): Promise<object> => {
      event.preventDefault()

      const response = await this.props.uploadQuiz()
      if (response.statusText === 'OK' || response.status === 200) {
         this.resetState()
         this.props.history.push('/') // go to list
      }
      return response
   }

   resetState() {
      this.setState({
         correct: 1,
         isFormValid: false,
         form: this.createForm()
      })
   }
}

const mapStateToProps = (state: { creator: Props }) => ({
   quiz: state.creator.quiz
})

const mapDispatchToProps = (dispatch: any) => ({
   updateQuiz: (item: object, name: string) => dispatch(Action.updateQuiz(item, name)),
   uploadQuiz: () => dispatch(Action.uploadQuiz())
})

export default connect(mapStateToProps, mapDispatchToProps)(Creator)
