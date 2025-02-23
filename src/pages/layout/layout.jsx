import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import styles from './layout.module.css';


export const Layout = () => {
  return (
    <div className={`mt-15 pt-30 ${styles.container}`}>
      <Outlet /> 
    </div>
  );
};