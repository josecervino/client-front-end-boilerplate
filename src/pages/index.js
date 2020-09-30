import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Switch, Route } from 'react-router-dom'
import * as serviceWorker from '../utilities/serviceWorker'
import { Grid } from '@material-ui/core'
import Home from './home'

const App = () => {
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </Grid>
    )
}

// register or unregister service workers for offline-first functionality
serviceWorker.register()

export default hot(App)
