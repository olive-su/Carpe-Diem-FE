import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { Navigate, Outlet } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

export default function PrivateRoute(): React.ReactElement | null {
    const { isAuthenticated, isLoading } = useSelector((state: any) => state.auth);
    if (isLoading) return <CircularProgress />;
    return isAuthenticated ? <Outlet /> : <Navigate to="/main" />;
}
