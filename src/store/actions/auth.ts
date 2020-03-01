/* eslint-disable no-use-before-define */
import Axios from 'axios'
import Types from './actionTypes'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { StateType } from '../reducers/auth'
import { AuthConst } from '@/constants'

type ThunkTypeVoid = ThunkAction<Promise<void>, StateType, undefined, ActionsTypes>
type ThunkTypeObj = ThunkAction<Promise<object>, StateType, undefined, ActionsTypes>

export type AuthDataType = {
   email: string,
   password: string,
   action: string
}
export const authUser = (authData: AuthDataType): ThunkTypeObj => {
   return async (dispatch: Dispatch<ActionsTypes>): Promise<object> => {
      const response = await Axios.post(
         `https://identitytoolkit.googleapis.com/v1/accounts:${authData.action}?key=AIzaSyBiPy_ZxHNmvqoORd_czjiS4dchO8TZR20`,
         {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
         }
      )
      if (response.status === 200) {
         const { idToken, localId, expiresIn } = response.data
         const prefix = AuthConst.APP_PREFIX
         const expires = String(new Date(new Date().getTime() + Number(expiresIn) * 1000))
         
         localStorage.setItem(`${prefix}IdToken`, idToken)
         localStorage.setItem(`${prefix}userId`, localId)
         localStorage.setItem(`${prefix}expires`, expires)
   
         dispatch(authSuccess(idToken))
         dispatch(autoLogout(Number(expiresIn)))
         return response
      }
   }
}

type AuthSuccessType = { type: typeof Types.AUTH_SUCCESS, token: string }
const authSuccess = (token: string): AuthSuccessType => ({
   type: Types.AUTH_SUCCESS,
   token
})

const autoLogout = (time: number): ThunkTypeVoid => {
   return async (dispatch: Dispatch<ActionsTypes>): Promise<void> => {
      setTimeout(() => {
         dispatch(logOut())
      }, time * 1000)
   }
}

type AuthSignOutType = { type: typeof Types.AUTH_SIGN_OUT }
export const logOut = (): AuthSignOutType => {
   const prefix = AuthConst.APP_PREFIX
   localStorage.removeItem(`${prefix}IdToken`)
   localStorage.removeItem(`${prefix}userId`)
   localStorage.removeItem(`${prefix}expires`)
   
   return {
      type: Types.AUTH_SIGN_OUT
   }
}

export const autoLogin = (): ThunkTypeVoid => {
   return async (dispatch: Dispatch<ActionsTypes>): Promise<void> => {
      const prefix = AuthConst.APP_PREFIX
      const token = localStorage.getItem(`${prefix}IdToken`)
   
      if (!token) {
         dispatch(logOut())
      } else {
         const expires = new Date(localStorage.getItem(`${prefix}expires`))
         if (expires <= new Date()) {
            dispatch(logOut())
         } else {
            dispatch(authSuccess(token))
            dispatch(autoLogout((Number(expires.getTime()) - new Date().getTime()) / 1000))
         }
      }
   }
}

export type ActionsTypes = AuthSuccessType | AuthSignOutType | any // for autologout
