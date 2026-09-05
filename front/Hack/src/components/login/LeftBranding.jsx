import React from 'react';
import { PieChart, ShieldCheck, Activity, Layers } from 'lucide-react';
import FeatureBadge from './FeatureBadge';

export default function LeftBranding() {
  const highlights = [
    { icon: PieChart, title: 'Smart Capital Optimization' },
    { icon: ShieldCheck, title: 'Real-Time Risk Controls' },
    { icon: Activity, title: 'Macro Scenario & Stress Testing' },
  ];

  return (
    <div className="branding-section">
      <div className="brand-logo-heading">
        <div className="brand-icon-box">
          <ShieldCheck size={26} color="#FFFFFF" />
        </div>
        <span className="brand-name">
          Capital<span style={{ color: '#FF5B37' }}>X</span>
        </span>
      </div>

      <div className="brand-badge">Autonomous Treasury Platform</div>

      <div className="branding-titles">
        <h1>Optimize Capital.<br />Control Your Risk.</h1>
        <p className="brand-description">
          Seamlessly manage corporate cash, dynamically optimize multi-asset yield curves, and enforce non-negotiable risk limits with autonomous AI.
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
