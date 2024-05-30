import { useEffect } from "react";
import authService from "./services/auth.service";
import "./App.css";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.currentUser();
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  });

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
