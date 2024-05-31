import { useEffect } from "react";
import authService from "./services/auth.service";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
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
      <Footer />
    </>
  );
}

export default App;
