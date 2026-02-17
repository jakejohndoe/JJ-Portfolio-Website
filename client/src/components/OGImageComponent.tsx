import React from 'react';

const OGImageComponent: React.FC = () => {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        background: 'linear-gradient(135deg, #0A0A0B 0%, #141416 100%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Space Grotesk, system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Background overlay gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0, 255, 214, 0.1) 0%, rgba(142, 68, 255, 0.05) 50%, rgba(0, 255, 214, 0.1) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 59px, rgba(255,255,255,0.03) 60px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 59px, rgba(255,255,255,0.03) 60px)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Left accent line */}
      <div
        style={{
          position: 'absolute',
          left: 100,
          top: '50%',
          width: 200,
          height: 2,
          background: 'rgba(0, 255, 214, 0.3)',
          transform: 'translateY(-50%)',
        }}
      />

      {/* Right accent line */}
      <div
        style={{
          position: 'absolute',
          right: 100,
          top: '50%',
          width: 200,
          height: 2,
          background: 'rgba(142, 68, 255, 0.3)',
          transform: 'translateY(-50%)',
        }}
      />

      {/* Left bracket */}
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 180,
          width: 20,
          height: 270,
          borderLeft: '3px solid rgba(0, 255, 214, 0.4)',
          borderTop: '3px solid rgba(0, 255, 214, 0.4)',
          borderBottom: '3px solid rgba(0, 255, 214, 0.4)',
        }}
      />

      {/* Right bracket */}
      <div
        style={{
          position: 'absolute',
          right: 60,
          top: 180,
          width: 20,
          height: 270,
          borderRight: '3px solid rgba(142, 68, 255, 0.4)',
          borderTop: '3px solid rgba(142, 68, 255, 0.4)',
          borderBottom: '3px solid rgba(142, 68, 255, 0.4)',
        }}
      />

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Name */}
        <h1
          style={{
            fontSize: 90,
            fontWeight: 'bold',
            margin: 0,
            marginBottom: 20,
            background: 'linear-gradient(90deg, #00FFD6 0%, #8E44FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: 2,
          }}
        >
          JAKE JOHN
        </h1>

        {/* Subtitle */}
        <h2
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: '#FFFFFF',
            margin: 0,
            marginBottom: 30,
          }}
        >
          Web3 Developer & Builder
        </h2>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 15,
            marginBottom: 30,
          }}
        >
          <span>Bridging Web2</span>
          <span style={{ color: '#00FFD6', fontSize: 32 }}>&lt;&gt;</span>
          <span>Web3</span>
        </div>

        {/* Website */}
        <p
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.5)',
            margin: 0,
            marginBottom: 40,
          }}
        >
          hellojakejohn.com
        </p>

        {/* Tech stack */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 30,
            fontSize: 16,
            color: 'rgba(255, 255, 255, 0.3)',
          }}
        >
          <span>React</span>
          <span style={{ color: 'rgba(0, 255, 214, 0.5)', fontSize: 8 }}>●</span>
          <span>TypeScript</span>
          <span style={{ color: 'rgba(0, 255, 214, 0.5)', fontSize: 8 }}>●</span>
          <span>Solidity</span>
          <span style={{ color: 'rgba(0, 255, 214, 0.5)', fontSize: 8 }}>●</span>
          <span>Node.js</span>
          <span style={{ color: 'rgba(0, 255, 214, 0.5)', fontSize: 8 }}>●</span>
          <span>Web3.js</span>
        </div>
      </div>
    </div>
  );
};

export default OGImageComponent;