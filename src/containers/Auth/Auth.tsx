import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { authUser, AuthDataType } from '@s/actions/auth'
import { AuthConst } from '@/constants'
import { FormGroup, FormControl, Control, Validators } from '@lib/mforms'
import Input from '@com/Input'
import Button from '@com/Button'
import classes from './Auth.module.scss'

type Props = {
   authUser: (authData: AuthDataType) => Promise<object>
}

type State = {
   form: { [key: string]: Control }
   isFormValid: boolean
   isLoginInvalid: boolean
}

class Auth extends Component<Props, State> {
   static propTypes = {
      authUser: PropTypes.func.isRequired
   }

   state: Readonly<State> = {
      form: this.createForm(),
      isFormValid: false,
      isLoginInvalid: false
   }

   createForm(): { [key: string]: Control } {
      return new FormGroup({
         email: new FormControl({
            type: 'email',
            label: 'Email',
            error: 'Email is invalid'
         }, [
            Validators.required,
            Validators.email,
            Validators.maxLength(30)
         ]),
         password: new FormControl({
            type: 'password',
            label: 'Password',
            error: 'Password is invalid'
         }, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
         ])
      })
   }

   render() {
      const { isFormValid, isLoginInvalid } = this.state

      return (
         <div className={classes.auth}>
            <div>
               <h1>Authorize</h1>

               <form onSubmit={e => e.preventDefault()}>
                  {this.renderInputs()}

                  <Button
                     type="success"
                     onClick={this.loginHandler}
                     disabled={!isFormValid}
                  >
                     Log in
                  </Button>

                  <Button
                     type="primary"
                     onClick={this.registrationHandler}
                     disabled={!isFormValid}
                  >
                     Register
                  </Button>

                  {isLoginInvalid &&
                  <span className={classes.invalid}>Incorrect email or password</span>}
               </form>
            </div>
         </div>
      )
   }

   input = React.createRef()

   renderInputs(): JSX.Element[] {
      const { controls } = this.state.form

      return Object.keys(controls).map((controlName: string, index) => {
         const control: Control = controls[controlName]
         return (
            <Input
               key={controlName + index}
               type={control.type}
               label={control.label}
               value={control.value}
               touched={control.touched}
               valid={control.valid}
               error={control.error}
               shouldValidate={Boolean(control.validators)}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  this.handleChange(event.target.value, controlName)
               }}
               onKeyPress={this.handleEnterKey}
               autofocus={controlName === 'email'}
            />
         )
      })
   }

   handleChange = (value: string, controlName: string): void => {
      const { form } = this.state
      const control = form.controls[controlName]
      control.value = value

      control.validate()
      form.validate()
      
      this.setState({
         form,
         isLoginInvalid: false,
         isFormValid: form.valid
      })
   }

   handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === 'Enter') {
         this.loginHandler()
      }
   }

   loginHandler = async(): Promise<object> => {
      const authData = {
         email: this.state.form.controls.email.value,
         password: this.state.form.controls.password.value,
         action: AuthConst.SIGN_IN
      }
      try {
         const response = await this.props.authUser(authData)
         if (response.status === 200) {
            // handle success (if needed)
         }
         return response
      } catch (err) {
         this.setState({ isLoginInvalid: true })
      }
   }

   registrationHandler = async(): Promise<object> => {
      const authData = {
         email: this.state.form.controls.email.value,
         password: this.state.form.controls.password.value,
         action: AuthConst.SIGN_UP
      }
      try {
         const response = await this.props.authUser(authData)
         if (response.status === 200) {
            // handle success (if needed)
         }
         return response
      } catch (err) {
         console.error(err)
      }
   }
}

const mmapDispatchToProps = (dispatch: any) => ({
   authUser: (authData: AuthDataType) => dispatch(authUser(authData))
})

export default connect(null, mmapDispatchToProps)(Auth)
