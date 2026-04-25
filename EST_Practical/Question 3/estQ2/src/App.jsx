import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <div >
              <h1>Login</h1>
              <p>Authenticated: {isAuthenticated ? 'true' : 'false'}</p>
              <button onClick={() => setIsAuthenticated(!isAuthenticated)}>
                Toggle Auth
              </button>
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <div >
                <h1>Dashboard</h1>
                <button onClick={() => setIsAuthenticated(false)}>Logout</button>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
