import React from 'react'
import { withRouter } from 'react-router-dom'

function LinkButton(props) {
    const {
        history,
        location,
        match,
        staticContext,
        to,
        ...other
    } = props

    const handleClick = event => history.push(to)

    return <button {...other} onClick={handleClick} />
}

export default withRouter(LinkButton)
