import React, { Fragment } from 'react'
import { Switch, Route } from "react-router-dom";
import { Typography } from '@material-ui/core'
import { ElectionGridContainer } from '../../../containers'


export default () => {
   return <Fragment>
        <Typography variant="h4" >Elections</Typography>
        <Switch>
            <Route  path="/admin/elections/general" render={ props => <ElectionGridContainer category={"general"} {...props} />}/>
            <Route path="/admin/elections/faculty" render={ props => <ElectionGridContainer category="faculty" {...props} />}/>
            <Route path="/admin/elections/department" render={ props => <ElectionGridContainer category={"department"} {...props} />}/>
        </Switch>
    </Fragment>
}