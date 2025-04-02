import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { checkAuth } from "../../services/actions/authActions";
import { RootState, AppDispatch } from "../../services/store";

type TProtectedRouteElementProps = {
  component: React.JSX.Element;
  onlyUnAuth?: boolean;
};

const ProtectedRouteElement = ({ component, onlyUnAuth = false }: TProtectedRouteElementProps): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isAuthChecked } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(checkAuth()).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading || !isAuthChecked) {
    return <></>;
  }

  if (onlyUnAuth && isAuthenticated) {
    const redirect = location.state?.from || "/";
    localStorage.setItem("isOpen", "false");
    return <Navigate to={redirect} />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return component;
};

export default ProtectedRouteElement;
