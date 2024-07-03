/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const AuthLayout = ({ children, shouldBeAuthenticated = true }) => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (shouldBeAuthenticated && authStatus !== shouldBeAuthenticated) {
      navigate("/login", {
        state: { from: location.pathname, data: location.state?.data },
      });
    }
  }, [
    authStatus,
    navigate,
    shouldBeAuthenticated,
    location.pathname,
    location.state,
  ]);
  useEffect(() => {
    if (shouldBeAuthenticated && location.state && location.state.from) {
      navigate(location.state.from);
    }
  }, [shouldBeAuthenticated, location.state, navigate]);
  return <>{children}</>;
};

export default AuthLayout;
