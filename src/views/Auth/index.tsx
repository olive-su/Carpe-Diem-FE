import * as React from 'react';
import Button from '@mui/material/Button';

import config from '../../config';

export default function SignIn() {
    return (
        <Button
            onClick={() => {
                window.location.replace(`http://${config.server.host}:${config.server.port}/auth/google`);
            }}
        >
            Google Login
        </Button>
    );
}
