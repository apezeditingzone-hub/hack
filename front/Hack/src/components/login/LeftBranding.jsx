import React from 'react';
import { PieChart, ShieldCheck, Activity, Layers } from 'lucide-react';
import FeatureBadge from './FeatureBadge';

export default function LeftBranding() {
  const highlights = [
    { icon: PieChart, title: 'Smart Portfolio Optimization' },
    { icon: ShieldCheck, title: 'Real-Time Risk Controls' },
    { icon: Activity, title: 'Scenario & Stress Testing' },
  ];

  return (
    <div className="branding-section">
      <div className="brand-logo-heading">
        <div className="brand-icon-box">
          <Layers size={26} color="#FFFFFF" />
        </div>
        <span className="brand-name">FinOpt</span>
      </div>

      <div className="brand-badge">Asset & Capital Management</div>

      <div className="branding-titles">
        <h1>Intelligent Capital.<br />Controlled Risk.</h1>
        <p className="brand-description">
          Optimize capital allocation, monitor portfolio risk, and make data-driven financial decisions with intelligent automation.
        </p>
      </div>

      <div className="features-list">
        {highlights.map((item, index) => (
          <FeatureBadge key={index} icon={item.icon} title={item.title} />
        ))}
      </div>
    </div>
  );
}
