import React, { useState, useEffect } from 'react';
import RLogo from './RLogo';

export default function LoadingSplashScreen({ onFinish }) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1.5s snappy and responsive duration
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onFinish) onFinish();
      }, 500);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'radial-gradient(circle at 50% 50%, #FFFFFF 0%, #F8FAFC 65%, #EEF2F6 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        opacity: isFadingOut ? 0 : 1,
        transform: isFadingOut ? 'scale(1.04)' : 'scale(1)',
        filter: isFadingOut ? 'blur(8px)' : 'blur(0px)',
        transition: 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), filter 0.55s ease',
        pointerEvents: isFadingOut ? 'none' : 'auto',
        userSelect: 'none',
        overflow: 'hidden'
      }}
    >
      {/* Background Decorative Matrix Mesh */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          opacity: 0.85,
          pointerEvents: 'none'
        }}
      />

      {/* Layered Radiant Ambient Glows */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22, 163, 74, 0.16) 0%, rgba(34, 197, 94, 0.05) 45%, transparent 70%)',
          filter: 'blur(54px)',
          animation: 'ambientFloat 4s ease-in-out infinite alternate',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '460px',
          height: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(9, 19, 46, 0.08) 0%, transparent 65%)',
          filter: 'blur(40px)',
          transform: 'translate(40px, -30px)',
          animation: 'ambientFloatReverse 5s ease-in-out infinite alternate',
          pointerEvents: 'none'
        }}
      />

      {/* Main Showcase Stage */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '560px',
          width: '100%',
          animation: 'cardScaleIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        <div
          style={{
            position: 'relative',
            borderRadius: '32px',
            overflow: 'hidden',
            boxShadow: '0 25px 65px -12px rgba(9, 19, 46, 0.12), 0 0 0 1px rgba(226, 232, 240, 0.8)',
            animation: 'gentleFloat 3.2s ease-in-out infinite'
          }}
        >
          {/* Shimmer Light Beam Effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '-150%',
              width: '250%',
              height: '100%',
              background: 'linear-gradient(105deg, transparent 25%, rgba(255, 255, 255, 0.75) 50%, transparent 75%)',
              animation: 'shimmerSweep 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
              pointerEvents: 'none',
              zIndex: 2
            }}
          />

          {/* Stylized Vector R Logo Showcase Card */}
          <div
            style={{
              padding: '2.5rem 3.5rem',
              background: '#FFFFFF',
              borderRadius: '28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              border: '1px solid rgba(226, 232, 240, 0.9)'
            }}
          >
            {/* Center R-Emblem Circle */}
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #09132E 0%, #111E48 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 28px rgba(9, 19, 46, 0.25)',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <RLogo size={52} isDark={true} />
            </div>

            {/* Typography */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#09132E', letterSpacing: '-0.04em' }}>
                  Risk
                </span>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#16A34A', letterSpacing: '-0.04em' }}>
                  Blance
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748B', fontWeight: 500, letterSpacing: '0.02em' }}>
                Smarter Risk. Better Balance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes cardScaleIn {
          0% {
            opacity: 0;
            transform: scale(0.92) translateY(18px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes gentleFloat {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes shimmerSweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes ambientFloat {
          0% {
            transform: scale(0.95) translate(-15px, -10px);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.08) translate(15px, 10px);
            opacity: 0.9;
          }
        }
        @keyframes ambientFloatReverse {
          0% {
            transform: scale(1.05) translate(10px, 15px);
            opacity: 0.5;
          }
          100% {
            transform: scale(0.92) translate(-10px, -15px);
            opacity: 0.85;
          }
        }
      `}</style>
    </div>
  );
}
