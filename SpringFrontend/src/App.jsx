import React, { useContext } from 'react';
import { Routes, Route, Navigate, BrowserRouter, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Register from './pages/Auth/Register.jsx';
import Login from './pages/Auth/Login.jsx';
import Home from './pages/Home/Home.jsx';
import NotFound from './pages/NotFound.jsx';

import { ToastContainer } from "react-fox-toast"

// context
import { UserContextProvider, UserContext } from './context/UserProvider.jsx';
import Profile from './pages/Profile/Profile.jsx';

function ProtectedRoute({ children }) {
  const { userIsLoggedIn } = useContext(UserContext);

  if (!userIsLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}

function App() {
  return (
    <UserContextProvider>
      <div>
        <ToastContainer />
      </div>
      <BrowserRouter>
        <Header />
        <Routes>
          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App; 