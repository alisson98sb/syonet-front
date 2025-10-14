import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../api/http";

export default function ProtectedRoute({ children }) {
  const [state, setState] = useState({ loading: true, allowed: false });

  useEffect(() => {
    let active = true;
    api.me()
      .then(() => active && setState({ loading: false, allowed: true }))
      .catch(() => active && setState({ loading: false, allowed: false }));
    return () => { active = false; };
  }, []);

  if (state.loading) return <div style={{ padding: 24 }}>Checando sessão...</div>;
  if (!state.allowed) return <Navigate to="/login" replace />;
  return children;
}
