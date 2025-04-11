import React from "react";
import { Outlet } from "react-router-dom";


import styles from './layout.module.css';


export const Layout = () : React.JSX.Element => {
  return (
    <div className={`mt-15 pt-30 ${styles.container}`}>
      <Outlet /> 
    </div>
  );
};