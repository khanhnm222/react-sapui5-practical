import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FlexBox, ShellBar } from "@ui5/webcomponents-react";

const LoginPage = lazy(() => import("./pages/login/Login"));
const DashboardPage = lazy(() => import("./pages/dashboard/Dashboard"));
const UsersPage = lazy(() => import("./pages/users/Users"));
const SettingsPage = lazy(() => import("./pages/settings/Settings"));
const TransactionsPage = lazy(() => import("./pages/transactions/Transactions"));

import LeftSidebar from "./components/LeftSidebar";

const queryClient = new QueryClient();

// Layout wrapper: sidebar + main content
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <FlexBox direction="Row" style={{ height: "100vh" }}>
      <div style={{ width: 240, borderRight: "1px solid #ccc" }}>
        <LeftSidebar />
      </div>
      <div style={{ flex: 1, padding: 16, overflow: "auto" }}>{children}</div>
    </FlexBox>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Login route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes (with sidebar) */}
          <Route
            path="/"
            element={
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            }
          />
          <Route
            path="/users"
            element={
              <AppLayout>
                <UsersPage />
              </AppLayout>
            }
          />
          <Route
            path="/transactions"
            element={
              <AppLayout>
                <TransactionsPage />
              </AppLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <AppLayout>
                <SettingsPage />
              </AppLayout>
            }
          />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
