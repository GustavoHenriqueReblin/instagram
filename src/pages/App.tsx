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
  return isAuthenticated ? <>{children}</> : <Navigate to={redirectTo} />;
};
 
function App() {
  return (
    <BrowserRouter>
      <ResponsiveProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login></Login>} />
            <Route 
              path='/' element={
                <PrivateRoute redirectTo="/login" cookieName={process.env.REACT_APP_COOKIE_NAME_USER_TOKEN}> 
                  <Timeline></Timeline>
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
      </ResponsiveProvider>
    </BrowserRouter>
  );
}

export default App;
