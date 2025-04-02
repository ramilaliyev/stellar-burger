import { useEffect } from 'react';
import { useAppDispatch } from "../../utils/appHooks";
import { Routes, Route, useLocation } from 'react-router-dom';

import { AppHeader } from '../app-header/app-header';
import { Home } from '../../pages/home/home';
import { Login } from '../../pages/login/login';
import { Register } from '../../pages/register/register';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import { Profile } from '../../pages/profile/profile';
import { ProfileComponent } from '../profile/profile';
import { Orders } from '../orders/orders';
import { FeedDetail } from '../feed-detail/feed-detail';
import { Feed } from '../../pages/feed/feed';
import { IngredientIndependent } from '../ingredient-independent/ingredient-independent';
import { NotFound } from '../../pages/not-found/not-found';


import Modal from '../modal/modal';
import ProtectedRouteElement from '../protected-route/protected-route';

import { Layout } from '../../pages/layout/layout';

import styles from './app.module.css';

import { getIngredients } from '../../services/slices/ingredientSlice';

import { baseURL } from '../../utils/baseURL';
const URL = `${baseURL}/ingredients`;


const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    dispatch(getIngredients(URL));
}, [dispatch]);

  return (
    <div className={styles.maincontent}>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path='/' element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:id" element={<FeedDetail />} />
        <Route path='/ingredients/:id' element={<IngredientIndependent />} />
        <Route path="profile" element={<ProtectedRouteElement component={<Profile />} />} >
          <Route index element={<ProfileComponent />}/>
          <Route path="orders"  element={<Orders />}/>
        </Route>
        <Route path="/profile/orders/:id"  element={<FeedDetail />}/>
        <Route element={<ProtectedRouteElement onlyUnAuth={true} component={<Layout />} />} >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
  
      {state?.backgroundLocation &&
      
        <Routes>
          <Route path='/ingredients/:id' element={<Modal />} />
          <Route path='/feed/:id' element={<Modal />} />
          <Route path='/profile/orders/:id' element={<Modal />} />
        </Routes>
      }
    </div>
  );
}

export default App
