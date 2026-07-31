'use client';

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-brand-bg pointer-events-none">
      
      {/* Subtle moving grid */}
      <div 
        className="absolute inset-[-100%] opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 100%)',
          animation: 'grid-pan 60s linear infinite'
        }}
      />

      {/* Two slow-moving glowing orbs for a premium aurora effect */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-[0.04] blur-[150px]"
        style={{
          background: 'linear-gradient(to right, #3B82F6, #8B5CF6)',
          animation: 'aurora-blob 25s infinite alternate'
        }}
      />
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-[0.03] blur-[150px]"
        style={{
          background: 'linear-gradient(to right, #3B82F6, #3B82F6)',
          animation: 'aurora-blob 35s infinite alternate-reverse'
        }}
      />
    </div>
  );
}
