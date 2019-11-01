import React, { useState} from 'react'
import { Switch, Route, Link } from "react-router-dom"
import PropTypes from 'prop-types'
import {
    AppBar,
    CssBaseline,
    Drawer,
    Hidden,
    IconButton,
    MenuList,
    MenuItem,
    Toolbar,
    Typography,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'

import Faculties from "../Admin/Faculties"
import Departments from "../Admin/Departments"
import Elections from "../Admin/Elections"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

function ResponsiveDrawer(props) {
  const { container, location: { pathname } } = props
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
        <Hidden smDown implementation="css">
            <div className={classes.toolbar} />
        </Hidden>
        <MenuList>
            <MenuItem component={Link} to="/admin" selected={'/admin' === pathname}>
                Dashboard
            </MenuItem>
            <MenuItem>
                Users
            </MenuItem>
            <MenuItem component={Link} to="/admin/faculties" selected={'/admin/faculties' === pathname}>
                Faculties
            </MenuItem>
            <MenuItem component={Link} to="/admin/departments" selected={'/admin/departments' === pathname}>
                Departments
            </MenuItem>
            <MenuItem component={Link} to="/admin/elections" selected={'/admin/elections' === pathname}>
                Elections
            </MenuItem>``
            <MenuItem component={Link} to="/admin/elections/general" selected={'/admin/elections/general' === pathname}>
                General
              </MenuItem>
              <MenuItem component={Link} to="/admin/elections/faculty" selected={'/admin/elections/faculty' === pathname}>
                Faculty
              </MenuItem>
              <MenuItem component={Link} to="/admin/elections/department" selected={'/admin/elections/department' === pathname}>
                Department
              </MenuItem>
        </MenuList>
    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            iBBuPoLLs
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <Switch>
                <Route exact path="/admin" render={() => <div>Dashboard</div>} />
                <Route  path="/admin/faculties" render={ props => <Faculties {...props} />} />
                <Route  path="/admin/departments" render={ props => <Departments {...props} />} />
                <Route  path="/admin/elections" render={ props => <Elections {...props} />} />
                <Route render={() => <h3>Not Found</h3>} />
            </Switch>
      </main>
    </div>
  )
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
}

export default ResponsiveDrawer