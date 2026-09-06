import React from 'react';

/**
 * RiskBalance Iconic 'R' Logo
 * Precision SVG vector representation featuring dynamic financial growth bars
 * and sleek geometric architecture.
 */
export default function RLogo({ size = 36, isDark = false, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      <defs>
        {/* Navy Gradient for R Spine & Loop */}
        <linearGradient id="rNavyGrad" x1="10" y1="10" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={isDark ? "#38BDF8" : "#09132E"} />
          <stop offset="100%" stopColor={isDark ? "#818CF8" : "#1E293B"} />
        </linearGradient>

        {/* Vibrant Growth Emerald Gradient */}
        <linearGradient id="rGreenGrad" x1="40" y1="90" x2="90" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#16A34A" />
          <stop offset="50%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#4ADE80" />
        </linearGradient>

        {/* Accent Orange/Coral Glow Gradient for Rebalance Spark */}
        <linearGradient id="rAccentGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF5B37" />
          <stop offset="100%" stopColor="#FF8F6B" />
        </linearGradient>
      </defs>

      {/* Main Stylized 'R' Structure */}
      {/* 1. Left Vertical Stem with angled fintech cuts */}
      <path
        d="M20 16 C20 14 21.5 12.5 23.5 12.5 H42 C58 12.5 68 20 68 33 C68 44 59.5 50.5 47 52 L68 84 C69.5 86.5 67.5 89.5 64.5 89.5 H50.5 C49 89.5 47.5 88.5 46.5 87 L29 55 H28 V86 C28 88 26.5 89.5 24.5 89.5 H23.5 C21.5 89.5 20 88 20 86 V16 Z"
        fill="url(#rNavyGrad)"
      />

      {/* 2. Inner Counter Loop Cutout */}
      <path
        d="M29 23 V44 H42 C49 44 54.5 40 54.5 33.5 C54.5 27 49 23 42 23 H29 Z"
        fill="#FFFFFF"
      />

      {/* 3. Rising Dynamic Chart Growth Bars (Integrated into R leg & energy) */}
      {/* Bar 1 (Low) */}
      <rect
        x="42"
        y="58"
        width="6"
        height="14"
        rx="3"
        fill="url(#rGreenGrad)"
        transform="rotate(-20 42 58)"
      />

      {/* Bar 2 (Mid) */}
      <rect
        x="54"
        y="46"
        width="6.5"
        height="24"
        rx="3.25"
        fill="url(#rGreenGrad)"
        transform="rotate(-20 54 46)"
      />

      {/* Bar 3 (High Dynamic Rebalance Peak) */}
      <rect
        x="67"
        y="30"
        width="7"
        height="36"
        rx="3.5"
        fill="url(#rGreenGrad)"
        transform="rotate(-20 67 30)"
      />

      {/* Dynamic Spark / Trend Dot at Peak */}
      <circle
        cx="78"
        cy="24"
        r="4.5"
        fill="url(#rAccentGrad)"
      />
    </svg>
  );
}
