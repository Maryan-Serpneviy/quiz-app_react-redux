import React, { useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { autoLogin } from '@s/actions/auth'
import Layout from '@hoc/Layout'
import Auth from '@con/Auth'
import Creator from '@con/Creator'
import List from '@con/List'
import Quiz from '@con/Quiz'
import Logout from '@com/Logout'

type Props = {
    isAuthorized: boolean
    autoLogin: () => void
    token?: string
}

const App: React.FC<Props> = (
    // eslint-disable-next-line no-shadow
    { isAuthorized, autoLogin } : InferProps<typeof App.propTypes>) => {

    useEffect(() => {
        autoLogin()
    }, [])

    return (
        <Layout>
            <Switch>
                {!isAuthorized && <Route path="/auth" component={Auth} />}
                {isAuthorized && <Route path="/creator" component={Creator} />}
                <Route path="/quiz/:id" component={Quiz} />
                <Route path="/" component={List} exact />
                {isAuthorized && <Route path="/logout" component={Logout} />}
                <Redirect to="/" />
            </Switch>
        </Layout>
    )
}

App.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    autoLogin: PropTypes.func.isRequired
}

const mapStateToProps = (state: { auth: Props }) => ({
    isAuthorized: !!state.auth.token
})

const mapDispatchToProps = (dispatch: autoLogin) => ({
    autoLogin: () => dispatch(autoLogin())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
