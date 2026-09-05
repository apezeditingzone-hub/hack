import React from 'react';

export default function FeatureBadge({ icon: Icon, title }) {
  return (
    <div className="feature-item">
      <div className="feature-icon-wrapper">
        <Icon size={20} aria-hidden="true" />
      </div>
      <span className="feature-text">{title}</span>
    </div>
  );
}
