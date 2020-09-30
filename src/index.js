/* eslint-disable import/no-unresolved */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { default as store } from './state'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './pages'
import theme from './common/core/theme'

const appEntryPoint = document.getElementById('app')
const history = createBrowserHistory()

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter history={history}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    appEntryPoint
)
