import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'
import { DepartmentGridContainer } from '../../../containers'


export default () => {
   return <Fragment>
        <Typography variant="h4" >Department</Typography>
        <DepartmentGridContainer />
    </Fragment>
}