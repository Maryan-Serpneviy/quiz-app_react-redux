import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './BackDrop.module.scss'

type Props = {
   hideMenu: () => void
}

const BackDrop: React.FC<Props> = ({ hideMenu }: InferProps<typeof BackDrop.propTypes>) => (
   <div
      className={classes.backdrop}
      onClick={hideMenu}
   />
)

BackDrop.propTypes = {
   hideMenu: PropTypes.func.isRequired
}

export default BackDrop
