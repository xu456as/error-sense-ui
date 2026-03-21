import { Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { AppShell } from './layout/AppShell';
import { LoginPage } from './pages/LoginPage';
import { DeveloperReportPage } from './pages/DeveloperReportPage';
import { ReviewerReportPage } from './pages/ReviewerReportPage';

function ProtectedRoutes() {
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppShell>
      <Routes>
        <Route index element={<Navigate to="/developer-report" replace />} />
        <Route path="/developer-report" element={<DeveloperReportPage />} />
        <Route path="/reviewer-report" element={<ReviewerReportPage />} />
      </Routes>
    </AppShell>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useAppContext();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/developer-report" replace /> : <LoginPage />}
      />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
