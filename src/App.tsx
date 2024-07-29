import React from "react";
import "highlight.js/styles/base16/dracula.css";
import { Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "./routes/DashBoard";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ResetRequest from "./routes/ResetRequest";
import Reset from "./routes/ResetPassword";
import HomePage from "./routes/NotePage";
import NoteEditor from "./routes/Note";
import UpdateNote from "./routes/Update";
import { /* ProtectedRoute,  */ UseAuth } from "./components/ProtectedRoute";

const App: React.FC = () => {
  const { isAuthenticated } = UseAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/note" /> : <Home />}
      />
      <Route path="/note" element={<DashBoard />}>
        <Route index element={<HomePage />} />
        <Route path="new" element={<NoteEditor />} />
        <Route path=":noteId" element={<UpdateNote />} />
      </Route>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/note" /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/note" /> : <Register />}
      />
      <Route
        path="/reset-request"
        element={isAuthenticated ? <Navigate to="/note" /> : <ResetRequest />}
      />
      <Route
        path="/reset-password"
        element={isAuthenticated ? <Navigate to="/note" /> : <Reset />}
      />
    </Routes>
  );
};

export default App;
