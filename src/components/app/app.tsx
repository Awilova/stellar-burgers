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
import { Modal, IngredientDetails, OrderInfo, AppHeader } from '@components';

import {
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
  useMatch
} from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';

import { FC, useEffect } from 'react';
import { useAppDispatch } from '@hooks';

import { getUser } from '@thunk';
import { getIngredients } from '@thunk';
import { title } from 'process';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { number } = useParams();
  const profileOrdersMatcher = useMatch('/profile/orders/:number')?.params
    .number;
  const feedMatcher = useMatch('/feed/:number')?.params.number;
  const location = useLocation();
  const orderNumber = profileOrdersMatcher || feedMatcher;
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, []);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={backgroundLocation || location}>
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
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_main-medium ${styles.detailHeader}`}
                >
                  Детали ингредиента
                </p>
                <IngredientDetails />
              </div>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_main-medium ${styles.detailHeader}`}
                >
                  {`#${orderNumber && orderNumber.padStart(6, '0')}`}
                </p>
                <OrderInfo />
              </div>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_main-medium ${styles.detailHeader}`}
                >
                  {`#${orderNumber && orderNumber.padStart(6, '0')}`}
                </p>
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              </div>
            }
          />
        </Routes>
        {backgroundLocation && (
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  title={`Детали ингредиента`}
                  onClose={() => navigate(-1)}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/feed/:number'
              element={
                <Modal
                  title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                  onClose={() => navigate(-1)}
                >
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal
                    title={`#${location.pathname.split('/')[3]}`}
                    onClose={() => navigate(-1)}
                  >
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
