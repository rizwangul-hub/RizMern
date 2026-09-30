import React from 'react';

/**
 * Reusable Card component with dark navy glassmorphism and subtle border lighting
 */
export function Card({
  children,
  interactive = false,
  className = '',
  ...props
}) {
  const interactiveClass = interactive ? 'card-interactive' : '';

  return (
    <div className={`card ${interactiveClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export default Card;
