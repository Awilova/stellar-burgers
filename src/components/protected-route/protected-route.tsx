import React from 'react';
import { useAppSelector } from '@hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthChecked, selectIsAuth } from '@slices';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  isUnauth?: boolean;
  children: React.ReactNode;
};

export default function ProtectedRoute({
  isUnauth,
  children
}: TProtectedRouteProps) {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuth);
  const isAuthChecked = useAppSelector(selectIsAuthChecked);

  if (!isAuthChecked) <Preloader />;

  if (!isUnauth && !isAuthenticated)
    <Navigate replace to='/login' state={{ from: location }} />;

  if (isUnauth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
}
