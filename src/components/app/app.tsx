import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  Profile,
  Register,
  ResetPassword,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Modal, IngredientDetails, OrderInfo } from '@components';

import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';

import { AppHeader } from '@components';
import { FC, useEffect } from 'react';
import { useAppDispatch } from '@hooks';

import { getUser } from '@thunk';
import { getIngredients } from '@thunk';


const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { number } = useParams();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, []);

  return (
    <>
    <div className={styles.app}>
      <AppHeader />
      <Routes location={location || backgroundLocation}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute isUnauth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute isUnauth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute isUnauth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='*'
          element={
            <ProtectedRoute>
              <NotFound404 />
            </ProtectedRoute>
          }
        />
          <Route
          path='/ingredients/:id'
          element={
              <IngredientDetails />
          }
        />
        <Route
          path='/feed/:number'
          element={
              <OrderInfo />
          }
        />
         <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
              </ProtectedRoute>
          }
        />
      </Routes>
      {backgroundLocation && (
      <Routes>
          <Route
          path='/ingredients/:id'
          element={
            <Modal title={`Детали ингредиента`} onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal title={`Заказ`} onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
            <Modal title={`#${location.pathname.split('/')[3]}`} onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
            </ProtectedRoute>
          }
        />
      </Routes>
      )}
    </div>
    </>
  );
};

export default App;
