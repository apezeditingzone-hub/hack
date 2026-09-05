import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import DashboardVisualizer from './components/landing/DashboardVisualizer';
import FeaturesSection from './components/landing/FeaturesSection';
import RiskMatrixSection from './components/landing/RiskMatrixSection';
import Footer from './components/landing/Footer';
import DemoModal from './components/landing/DemoModal';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SafeguardsPage from './pages/SafeguardsPage';
import { RiskSafeguardProvider } from './context/RiskSafeguardContext';
import RedAlertBanner from './components/safeguards/RedAlertBanner';

function LandingView({ onOpenDemo, onOpenLogin }) {
  return (
    <div className="capitalx-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar onOpenDemo={onOpenDemo} onOpenLogin={onOpenLogin} />

      {/* Main Landing Page Content */}
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem 1.5rem 0 1.5rem' }}>
          <RedAlertBanner />
        </div>
        {/* 1. Hero Section with Call to Actions */}
        <Hero 
          onGetStarted={onOpenDemo}
          onViewDemo={onOpenDemo}
        />

        {/* 2. Interactive Dashboard-Style Financial Visualization */}
        <DashboardVisualizer onOpenDemo={onOpenDemo} />

        {/* 3. Three Core Features Section */}
        <FeaturesSection onOpenDemo={onOpenDemo} />

        {/* 4. Institutional Risk & Macro Sandbox Section */}
        <RiskMatrixSection onOpenDemo={onOpenDemo} />
      </main>

      {/* 5. Enterprise Footer */}
      <Footer onOpenDemo={onOpenDemo} />
    </div>
  );
}

function App() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenDemo = () => {
    setIsDemoOpen(true);
  };

  const handleCloseDemo = () => {
    setIsDemoOpen(false);
  };

  const handleOpenLogin = () => {
    navigate('/login');
  };

  return (
    <RiskSafeguardProvider>
      <Routes>
        {/* First / Default Screen: Login & Sign Up Authentication Page */}
        <Route 
          path="/" 
          element={<LoginPage onBackToHome={() => navigate('/landing')} />} 
        />

        {/* Login alias route */}
        <Route 
          path="/login" 
          element={<LoginPage onBackToHome={() => navigate('/landing')} />} 
        />

        {/* Control & Safeguard System Operations Center */}
        <Route 
          path="/safeguards" 
          element={<SafeguardsPage />} 
        />
        <Route 
          path="/control" 
          element={<SafeguardsPage />} 
        />
        <Route 
          path="/risk" 
          element={<SafeguardsPage />} 
        />

        {/* Main Platform & Dashboard Screen (Previous rich screen) */}
        <Route 
          path="/dashboard" 
          element={
            <LandingView 
              onOpenDemo={handleOpenDemo} 
              onOpenLogin={handleOpenLogin} 
            />
          } 
        />

        {/* CapitalX Landing & Home Routes */}
        <Route 
          path="/landing" 
          element={
            <LandingView 
              onOpenDemo={handleOpenDemo} 
              onOpenLogin={handleOpenLogin} 
            />
          } 
        />
        <Route 
          path="/home" 
          element={
            <LandingView 
              onOpenDemo={handleOpenDemo} 
              onOpenLogin={handleOpenLogin} 
            />
          } 
        />

        {/* Catch-all fallback to Platform View */}
        <Route 
          path="*" 
          element={
            <LandingView 
              onOpenDemo={handleOpenDemo} 
              onOpenLogin={handleOpenLogin} 
            />
          } 
        />
      </Routes>

      {/* Interactive Demo Simulation Modal */}
      <DemoModal isOpen={isDemoOpen} onClose={handleCloseDemo} />
    </RiskSafeguardProvider>
  );
}

export default App;
