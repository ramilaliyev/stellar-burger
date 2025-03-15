import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setAuthChecked, setAuthenticated } from "../../services/slices/authSlice";
import { getToken, getUser } from "../../utils/api"; 

import { RootState } from "../../services/store";

type TProtectedRouteElementProps = {
  component: React.JSX.Element;
  onlyUnAuth?: boolean;
};

const ProtectedRouteElement = ({ component, onlyUnAuth = false }: TProtectedRouteElementProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const { isAuthenticated, isAuthChecked } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {        
        try {
          const res = await getUser();

          if (!res.ok) {
            const newTokenData = await getToken();  
            localStorage.setItem("accessToken", newTokenData.accessToken);  
            localStorage.setItem("refreshToken", newTokenData.refreshToken); 
            dispatch(setAuthenticated(true));
          } else {
            dispatch(setAuthenticated(true));
          }
        } catch (error) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setAuthenticated(false));
        }
      } else {
        dispatch(setAuthenticated(false));
      }

      dispatch(setAuthChecked(true));
      setLoading(false);
    };

    checkToken();
  }, [dispatch]);

  if (loading) {
    return <></>;
  }

  if (!isAuthChecked) {
    return <></>;
  }

  if (onlyUnAuth && isAuthenticated) {
    const redirect = location.state?.from || '/';
    localStorage.setItem('isOpen', 'false');
    
    return <Navigate to={`${redirect}`} />;  
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{from: location.pathname}}/>;
  }

  return component;
};

export default ProtectedRouteElement;
