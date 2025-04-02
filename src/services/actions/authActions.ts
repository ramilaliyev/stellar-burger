import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, getToken } from "../../utils/api";
import { setAuthChecked, setAuthenticated } from "../slices/authSlice";

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { dispatch }) => {
  const accessToken = localStorage.getItem("accessToken");
  

  if (accessToken) {
    try {
      const res = await getUser();

      if (res.ok) { // Здесь оставил как есть т.к. это не общий случай с другими в проекте. Пробовал варианты, искал что-то, но в итоге решил оставить так.
        dispatch(setAuthenticated(true));
      } else {
        const newTokenData = await getToken();
        localStorage.setItem("accessToken", newTokenData.accessToken);
        localStorage.setItem("refreshToken", newTokenData.refreshToken);
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
});