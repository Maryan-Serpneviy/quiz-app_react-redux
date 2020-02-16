import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from '~hoc/Layout'
import Auth from '~cn/Auth'
import Creator from '~cn/Creator'
import List from '~cn/List'
import Quiz from '~cn/Quiz'

export default function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/creator" component={Creator} />
                <Route path="/quiz/:id" component={Quiz} />
                <Route path="/" component={List} />
            </Switch>
        </Layout>
    )
}
