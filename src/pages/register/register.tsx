import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';

import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks';
import { regUser } from '@thunk';
import { selectIsAuth } from '@slices';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password || !userName) {
      return;
    }
    dispatch(regUser({ email, password, name: userName }));
  };

  if (isAuth) <Navigate to='/login' replace />;

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
