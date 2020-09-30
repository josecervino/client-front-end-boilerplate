import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Switch, Route, Link } from 'react-router-dom'
import * as serviceWorker from '../utilities/serviceWorker'
import { Grid } from '@material-ui/core'
import Home from './home'
import Profile from './profile'
import Dojos from './dojos'
import Login from './login'

const App = () => {
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Log In</Link>
                </li>
                <li>
                    <Link to="/dojos">Dojos</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
            </ul>

            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/dojos">
                    <Dojos />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
            </Switch>
        </Grid>
    )
}

// register or unregister service workers for offline-first functionality
serviceWorker.register()

export default hot(App)
