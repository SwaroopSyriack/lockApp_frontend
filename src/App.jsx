import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./Route/Home";
import LoginPage from "./Pages/Login";
import DataGeneratorPage from "./Route/DataGeneratorPage";
import SchemaConfigPage from "./Route/SchemaConfig";
import Admin from "./Route/Admin";
import PrivateRoute from "./Route/PrivateRoute ";
import Layout from "./Pages/Layout";
import Settings from "./Route/Settings";
import Dashboard from "./Route/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<Layout />}>
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<DataGeneratorPage />} />
          <Route path="/input" element={<SchemaConfigPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        
      </Route>
    </Routes>
  );
}

export default App;
