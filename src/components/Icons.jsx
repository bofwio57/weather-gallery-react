
import React from 'react';

export const SunIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

export const CloudIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.3-1.7-4.2-3.9-4.5-1.1-2.9-3.9-5-7.1-5-3.3 0-6.1 2.2-7.1 5.2C1.7 10.7 0 12.7 0 15c0 2.8 2.2 5 5 5h12.5z" />
  </svg>
);

export const RainIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.89c0-2.4 1.83-4.34 4.1-4.34a3.84 3.84 0 0 1 3.4 1.89c.7-.6 1.62-.94 2.6-.94 2.2 0 4 1.8 4 4a3.64 3.64 0 0 1-.36 1.6c1.37.1 2.26 1.3 2.26 2.4a2.5 2.5 0 0 1-2.5 2.5H6.5c-1.38 0-2.5-1.12-2.5-2.5 0-1 1-2 2-2.11z" />
    <path d="M8 20l-1 2M12 20l-1 2M16 20l-1 2" />
  </svg>
);

export const SnowIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m20 20-3-3M4 4l3 3M20 4l-3 3M4 20l3-3M12 2v3M12 19v3M22 12h-3M5 12H2" />
  </svg>
);

export const WindIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2" />
  </svg>
);

export const DropIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5s-3 3.5-3 5.5a7 7 0 0 0 7 7z" />
  </svg>
);

export const VisibilityIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const PinIcon = ({ style, className }) => (
  <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const WeatherIcon = ({ condition, style, className }) => {
  const c = condition?.toLowerCase() || '';
  if (c.includes('sun') || c.includes('clear')) return <SunIcon style={style} className={className} />;
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return <RainIcon style={style} className={className} />;
  if (c.includes('snow') || c.includes('ice')) return <SnowIcon style={style} className={className} />;
  return <CloudIcon style={style} className={className} />;
};
