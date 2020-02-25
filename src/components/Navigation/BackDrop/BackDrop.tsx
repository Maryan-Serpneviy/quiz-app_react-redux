import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './BackDrop.module.scss'

const BackDrop: React.FC<Props> = ({ hideMenu }: InferProps<typeof BackDrop.propTypes>) => (
   <div
      className={classes.backdrop}
      onClick={hideMenu}
   />
)

BackDrop.propTypes = {
   hideMenu: PropTypes.func.isRequired
}

type Props = {
   hideMenu: () => void
}

export default BackDrop
