/* eslint-disable no-use-before-define */
import Axios from 'axios'
import Types from './actionTypes'
import { AuthConst } from '@/constants'

export const authUser = (authData: {
   email: string,
   password: string
}, authAction: string) => async(dispatch: any): Promise<object> => {

   const response = await Axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:${authAction}?key=AIzaSyBiPy_ZxHNmvqoORd_czjiS4dchO8TZR20`,
      {
         ...authData,
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

const authSuccess = (token: string) => ({
   type: Types.AUTH_SUCCESS,
   token
})

const autoLogout = (time: number) => (dispatch) => {
   setTimeout(() => {
      dispatch(signOut())
   }, time * 1000)
}

const signOut = () => {
   const prefix = AuthConst.APP_PREFIX
   localStorage.removeItem(`${prefix}IdToken`)
   localStorage.removeItem(`${prefix}userId`)
   localStorage.removeItem(`${prefix}expires`)
   
   return {
      type: Types.AUTH_SIGN_OUT
   }
}
