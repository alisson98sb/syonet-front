import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Items from "./pages/Items";
import History from "./pages/History";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/items"
          element={<ProtectedRoute><Items /></ProtectedRoute>}
        />
        <Route
          path="/history"
          element={<ProtectedRoute><History /></ProtectedRoute>}
        />
        <Route path="*" element={<Navigate to="/items" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
