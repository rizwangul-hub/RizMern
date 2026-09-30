import React from 'react';

/**
 * Reusable Badge component for technology tags and status indicators
 * @param {'purple' | 'blue' | 'outline'} variant
 */
export function Badge({
  children,
  variant = 'purple',
  className = '',
  ...props
}) {
  return (
    <span className={`badge badge-${variant} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}

export default Badge;
