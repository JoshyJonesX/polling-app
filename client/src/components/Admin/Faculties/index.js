import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'
import { FacultyGridContainer } from '../../../containers'


export default () => {
   return <Fragment>
        <Typography variant="h4" >Faculty</Typography>
        <FacultyGridContainer />
    </Fragment>
}