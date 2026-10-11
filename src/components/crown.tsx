import { useId } from "react";

/** A small gold crown used as a royal accent. */
export function Crown({ className }: { className?: string }) {
  const id = useId();
  const grad = `crown-gold-${id.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg viewBox="0 0 64 52" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0d49a" />
          <stop offset="45%" stopColor="#c99a47" />
          <stop offset="100%" stopColor="#9a7524" />
        </linearGradient>
      </defs>
      <path
        d="M6 44 L10 14 L20 28 L32 8 L44 28 L54 14 L58 44 Z"
        fill={`url(#${grad})`}
      />
      <rect x="6" y="44" width="52" height="6" rx="2" fill={`url(#${grad})`} />
      <circle cx="10" cy="12" r="2.6" fill="#e6c17a" />
      <circle cx="32" cy="6" r="3" fill="#e6c17a" />
      <circle cx="54" cy="12" r="2.6" fill="#e6c17a" />
      <circle cx="20" cy="26" r="2" fill="#f5ebdd" opacity="0.85" />
      <circle cx="44" cy="26" r="2" fill="#f5ebdd" opacity="0.85" />
    </svg>
  );
}
