import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/Landing';
import { AuthPage } from './pages/Auth';
import { CreatorDashboard } from './pages/creator/Dashboard';
import { CreateTest } from './pages/creator/CreateTest';
import { TestResults } from './pages/creator/TestResults';
import { TesterDashboard } from './pages/tester/Dashboard';
import { ActiveTest } from './pages/tester/ActiveTest';
import { ProfilePage } from './pages/Profile';

// Route Guards
const ProtectedRoute: React.FC<{ children: React.ReactNode, allowedRole?: 'CREATOR' | 'TESTER' }> = ({ children, allowedRole }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  if (!user) return <Navigate to="/auth/login" />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/" />;

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        
        {/* Auth */}
        <Route path="auth/login" element={<AuthPage mode="login" />} />
        <Route path="auth/register" element={<AuthPage mode="register" />} />

        {/* Protected Common Routes */}
        <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        {/* Creator Routes */}
        <Route path="creator" element={<ProtectedRoute allowedRole="CREATOR"><CreatorDashboard /></ProtectedRoute>} />
        <Route path="creator/new" element={<ProtectedRoute allowedRole="CREATOR"><CreateTest /></ProtectedRoute>} />
        <Route path="creator/test/:id" element={<ProtectedRoute allowedRole="CREATOR"><TestResults /></ProtectedRoute>} />

        {/* Tester Routes */}
        <Route path="tester" element={<ProtectedRoute allowedRole="TESTER"><TesterDashboard /></ProtectedRoute>} />
        <Route path="tester/available" element={<ProtectedRoute allowedRole="TESTER"><TesterDashboard /></ProtectedRoute>} /> {/* Reusing for demo */}
        <Route path="tester/test/:id" element={<ProtectedRoute allowedRole="TESTER"><ActiveTest /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  );
};

export default App;