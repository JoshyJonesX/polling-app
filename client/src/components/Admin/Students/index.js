import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'
import { StudentGridContainer } from '../../../containers'


export default () => {
   return <Fragment>
        <Typography variant="h4" >Students</Typography>
        <StudentGridContainer />
    </Fragment>
}