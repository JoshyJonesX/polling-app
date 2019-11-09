import React, { Fragment } from 'react'

import { Authentication } from '../../../containers'

export default ({ buttonText, linkText, helperText, signIn }) => (
    <Fragment>
        <Authentication signIn={signIn}  buttonText={buttonText} linkText={linkText} helperText={helperText} />
    </Fragment>
)