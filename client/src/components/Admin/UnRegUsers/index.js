import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'
import { UnRegUserGridContainer } from '../../../containers'


export default () => {
   return <Fragment>
        <Typography variant="h4" >Unregistered Students</Typography>
        <UnRegUserGridContainer />
    </Fragment>
}