import ResponsiveProvider from "../components/ResponsiveProvider";

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthProvider } from "../contexts/userContext";
import Login from "./Login/Login";
import Timeline from "./Timeline/Timeline";

interface PrivateRouteProps {
  children: React.ReactNode;
  redirectTo: string;
  cookieName: string | undefined;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, redirectTo, cookieName }) => {
  const isAuthenticated = !!(Cookies.get(cookieName ? cookieName : ''));
  return isAuthenticated ? <>{children}</> : <Navigate to={redirectTo} replace />;
};
 
function App() {
  return (
    <BrowserRouter>
      <ResponsiveProvider>
        <Routes>
          <Route path="/login" element={<Login></Login>} />
          <Route 
            path='/' element={
              <AuthProvider>
                <PrivateRoute redirectTo="/login" cookieName={process.env.REACT_APP_COOKIE_NAME_USER_TOKEN}> 
                  <Timeline></Timeline>
                </PrivateRoute>
              </AuthProvider>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ResponsiveProvider>
    </BrowserRouter>
  );
}

export default App;
