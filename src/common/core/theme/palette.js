import colors from './colors'

// FUTURE: ADD MEDIA QUERY TO DETERMINE DARK MODE
const prefersDarkMode = false

export default {
    type: prefersDarkMode ? 'dark' : 'light',
    primary: {
        main: colors.grayScale.white,
    },
    secondary: {
        main: colors.core.blue3,
    },
}
