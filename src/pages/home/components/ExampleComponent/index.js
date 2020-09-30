/* eslint-disable import/no-unresolved */
import React from 'react'
import { Grid, Typography } from 'ui-components'

const ExampleComponent = ({ text }) => {
    return (
        <Grid container direction="container" justify="center">
            <Typography>{text}</Typography>
        </Grid>
    )
}

export default ExampleComponent
