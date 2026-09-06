import React, { createContext, useContext, useState, useRef } from 'react';

const DockContext = createContext({ mouseX: null, mouseY: null, orientation: 'vertical' });

export function Dock({ children, orientation = 'vertical', className = '', style = {} }) {
  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const dockRef = useRef(null);

  const handleMouseMove = (e) => {
    if (dockRef.current) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    setMousePos({ x: null, y: null });
  };

  const isVertical = orientation === 'vertical';

  return (
    <DockContext.Provider value={{ mouseX: mousePos.x, mouseY: mousePos.y, orientation }}>
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`apple-dock-container ${isVertical ? 'dock-vertical' : 'dock-horizontal'} ${className}`}
        style={{
          display: 'inline-flex',
          flexDirection: isVertical ? 'column' : 'row',
          alignItems: 'center',
          gap: isVertical ? '18px' : '20px',
          padding: isVertical ? '20px 10px' : '10px 22px',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(28px) saturate(190%)',
          WebkitBackdropFilter: 'blur(28px) saturate(190%)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          borderRadius: '9999px',
          boxShadow: '0 16px 40px -8px rgba(15, 23, 42, 0.12), 0 4px 14px rgba(15, 23, 42, 0.04)',
          transition: 'all 0.25s ease',
          position: 'relative',
          ...style
        }}
      >
        {children}
      </div>
    </DockContext.Provider>
  );
}

export function DockItem({ children, onClick, active = false, className = '', style = {} }) {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef(null);
  const { mouseX, mouseY, orientation } = useContext(DockContext);
  const isVertical = orientation === 'vertical';

  // Calculate dynamic magnification based on distance to mouse
  let scale = 1;
  const mouseCoord = isVertical ? mouseY : mouseX;

  if (mouseCoord !== null && itemRef.current) {
    const rect = itemRef.current.getBoundingClientRect();
    const itemCenter = isVertical ? rect.top + rect.height / 2 : rect.left + rect.width / 2;
    const distance = Math.abs(mouseCoord - itemCenter);
    const maxDistance = 120;
    if (distance < maxDistance) {
      // Smooth cosine interpolation for natural apple dock feel
      const factor = (1 + Math.cos((distance / maxDistance) * Math.PI)) / 2;
      scale = 1 + factor * 0.35; // Max 1.35x scale
    }
  }

  const transformStyle = isVertical
    ? `scale(${scale}) translateX(${scale > 1 ? (scale - 1) * 12 : 0}px)`
    : `scale(${scale}) translateY(${scale > 1 ? (scale - 1) * 6 : 0}px)`;

  return (
    <div
      ref={itemRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`dock-item ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: active 
          ? '#0F172A' 
          : isHovered 
            ? '#F1F5F9' 
            : 'rgba(248, 250, 252, 0.95)',
        border: active ? '1px solid #0F172A' : '1px solid rgba(226, 232, 240, 0.8)',
        color: active ? '#FFFFFF' : '#334155',
        cursor: 'pointer',
        transform: transformStyle,
        transformOrigin: isVertical ? 'center left' : 'top center',
        transition: mouseCoord !== null ? 'transform 0.08s ease-out, background 0.2s' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s',
        boxShadow: active 
          ? '0 6px 16px rgba(15, 23, 42, 0.25)' 
          : isHovered 
            ? '0 6px 14px rgba(15, 23, 42, 0.08)' 
            : '0 2px 4px rgba(0, 0, 0, 0.02)',
        zIndex: isHovered ? 50 : 1,
        ...style
      }}
    >
      {React.Children.map(children, (child) => {
        if (!child) return null;
        if (child.type === DockLabel) {
          return React.cloneElement(child, { visible: isHovered, isVertical });
        }
        if (child.type === DockIcon) {
          return React.cloneElement(child, { active, isHovered });
        }
        return child;
      })}

      {/* Active Dot Indicator like macOS */}
      {active && (
        <span
          style={{
            position: 'absolute',
            ...(isVertical 
              ? { left: '-4px', top: '50%', transform: 'translateY(-50%)' } 
              : { bottom: '-5px', left: '50%', transform: 'translateX(-50%)' }),
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: '#0F172A'
          }}
        />
      )}
    </div>
  );
}

export function DockIcon({ children, active = false, isHovered = false, className = '', style = {} }) {
  return (
    <div
      className={`dock-icon ${className}`}
      style={{
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? '#FFFFFF' : isHovered ? '#0F172A' : '#475569',
        transition: 'color 0.15s ease',
        ...style
      }}
    >
      {children}
    </div>
  );
}

export function DockLabel({ children, visible = false, isVertical = true, className = '', style = {} }) {
  const positionStyles = isVertical
    ? {
        left: 'calc(100% + 12px)',
        top: '50%',
        transform: visible ? 'translateY(-50%) translateX(0) scale(1)' : 'translateY(-50%) translateX(-4px) scale(0.9)',
        transformOrigin: 'center left'
      }
    : {
        top: 'calc(100% + 10px)',
        left: '50%',
        transform: visible ? 'translateX(-50%) translateY(0) scale(1)' : 'translateX(-50%) translateY(-4px) scale(0.9)',
        transformOrigin: 'top center'
      };

  return (
    <div
      className={`dock-label ${className}`}
      style={{
        position: 'absolute',
        background: '#0F172A',
        color: '#FFFFFF',
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.01em',
        padding: '4px 10px',
        borderRadius: '8px',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'all 0.15s ease',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)',
        zIndex: 100,
        ...positionStyles,
        ...style
      }}
    >
      {children}
      {/* Tooltip triangle arrow */}
      <span
        style={{
          position: 'absolute',
          ...(isVertical 
            ? { left: '-3px', top: '50%', transform: 'translateY(-50%) rotate(45deg)' } 
            : { top: '-3px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' }),
          width: '6px',
          height: '6px',
          backgroundColor: '#0F172A'
        }}
      />
    </div>
  );
}
