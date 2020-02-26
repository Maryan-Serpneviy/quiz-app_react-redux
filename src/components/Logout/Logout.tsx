import React, { useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '@s/actions/auth'

type Logout = {
   logOut: () => void
}

// eslint-disable-next-line no-shadow
const Logout: React.FC<Logout> = ({ logOut }: InferProps<typeof Logout.PropTypes>) => {
   useEffect(() => {
      logOut()
   }, [])

   return (
      <Redirect to="/" />
   )
}

Logout.propTypes = {
   logOut: PropTypes.func.isRequired
}

const mmapDispatchToProps = (dispatch: logOut) => ({
   logOut: () => dispatch(logOut())
})

export default connect(null, mmapDispatchToProps)(Logout)
