import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { authUser, AuthDataType } from '@s/actions/auth'
import { AuthConst } from '@/constants'
import Formic, { FormControl, Control } from '@lib/formic'
import Input from '@com/Input'
import Button from '@com/Button'
import classes from './Auth.module.scss'

type Props = {
   authUser: (authData: AuthDataType) => Promise<object>
}

type State = {
   formControls: { [key: string]: Control }
   isFormValid: boolean
   isLoginInvalid: boolean
}

class Auth extends Component<Props, State> {
   static propTypes = {
      authUser: PropTypes.func.isRequired
   }

   state: Readonly<State> = {
      formControls: this.createFormControls(),
      isFormValid: false,
      isLoginInvalid: false
   }

   createFormControls(): { [key: string]: Control } {
      return {
         email: new FormControl({
            type: 'email',
            label: 'Email',
            error: 'Email is invalid'
         }, {
            required: true,
            email: true
         }),
         password: new FormControl({
            type: 'password',
            label: 'Password',
            error: 'Password is invalid'
         }, {
            required: true,
            minLength: 6
         })
      }
   }

   render() {
      const { isFormValid } = this.state

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

                  {this.state.isLoginInvalid &&
                  <span className={classes.invalid}>Incorrect email or password</span>}
               </form>
            </div>
         </div>
      )
   }

   input = React.createRef()

   renderInputs(): JSX.Element[] {
      const { formControls } = this.state

      return Object.keys(formControls).map((controlName: string, index) => {
         const control: Control = formControls[controlName]
         return (
            <Input
               key={controlName + index}
               label={control.label}
               type={control.type}
               value={control.value}
               error={control.error}
               touched={control.touched}
               valid={control.valid}
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
      const formControls = { ...this.state.formControls }
      const control: Control = {
         ...formControls[controlName],
         touched: true,
         value
      }

      control.valid = Formic.validate(control.value, control.validators)

      formControls[controlName] = control

      this.setState({
         formControls,
         isLoginInvalid: false,
         isFormValid: Formic.validateForm(formControls)
      })
   }

   handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === 'Enter') {
         this.loginHandler()
      }
   }

   loginHandler = async(): Promise<object> => {
      const authData = {
         email: this.state.formControls.email.value,
         password: this.state.formControls.password.value,
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
         email: this.state.formControls.email.value,
         password: this.state.formControls.password.value,
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

const mmapDispatchToProps = (dispatch: any): object => ({
   authUser: (authData: AuthDataType) => dispatch(authUser(authData))
})

export default connect(null, mmapDispatchToProps)(Auth)
