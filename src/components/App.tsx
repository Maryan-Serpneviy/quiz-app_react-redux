import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from '@hoc/Layout'
import Auth from '@con/Auth'
import Creator from '@con/Creator'
import List from '@con/List'
import Quiz from '@con/Quiz'

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
