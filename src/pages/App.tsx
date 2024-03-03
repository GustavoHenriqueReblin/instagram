import ResponsiveProvider from "../components/ResponsiveProvider";

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

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
        <Routes>
          <Route path="/" element={<></>} />
          {/* <Route 
            path='/admin' element={
              <PrivateRoute redirectTo="/login" cookieName={process.env.REACT_APP_COOKIE_NAME_USER_TOKEN}> 
                <></>
              </PrivateRoute>
            } 
          /> */}
        </Routes>
      </ResponsiveProvider>
    </BrowserRouter>
  );
}

export default App;
