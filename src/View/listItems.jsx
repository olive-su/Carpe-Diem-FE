import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

export const mainList = (
    <>
        <ListItemButton>
            <ListItemIcon>
                <RadioButtonCheckedIcon />
            </ListItemIcon>
            <ListItemText primary="My Records" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Album" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <OndemandVideoIcon />
            </ListItemIcon>
            <ListItemText primary="Videos" />
        </ListItemButton>
    </>
);

export const secondList = (
    <>
        {/* 사이드바(내서재) */}
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="My Album(custom)" />
        </ListItemButton>

    </>
);