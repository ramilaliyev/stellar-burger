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
import { Feed } from '../feed/feed';
import { IngredientIndependent } from '../ingredient-independent/ingredient-independent';
import { NotFound } from '../../pages/not-found/not-found';

import Modal from '../modal/modal';
import ProtectedRouteElement from '../protected-route/protected-route';

import { Layout } from '../../pages/layout/layout';

import styles from './app.module.css';

const App = () => {
  const location = useLocation();
  const state = location.state;
  
  {state?.backgroundLocation && 
    <Routes>
      <Route path='/ingredients/:id' element={<Modal />} />
    </Routes>
  }

  return (
    <div className={styles.maincontent}>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path='/' element={<Home />} />
        <Route path="/feed" element={<ProtectedRouteElement component={<Feed />} />} />
        {/* <Route path='/feed' element={<Feed />} /> */}
        <Route path='/ingredients/:id' element={<IngredientIndependent />} />
        {/* <Route path='profile' element={<Profile />} > */}
        <Route path="profile" element={<ProtectedRouteElement component={<Profile />} />} >
          <Route index element={<ProfileComponent />}/>
          <Route path="orders"  element={<Orders />}/>
        </Route>
        <Route element={<ProtectedRouteElement onlyUnAuth="true" component={<Layout />} />} >
        {/* <Route element={<Layout />} > */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App
