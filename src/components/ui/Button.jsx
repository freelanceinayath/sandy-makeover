import React from 'react';

export const Button = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-colors';
  const sizeStyles = 'h-[44px] px-6 text-button-md rounded-brand';
  
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-brand-green text-white hover:bg-brand-darkGreen active:bg-brand-darkGreen';
      break;
    case 'outline':
      variantStyles = 'bg-transparent text-ink-main border-2 border-brand-green hover:bg-surface-soft';
      break;
    case 'outline-dark':
      variantStyles = 'bg-transparent text-white border-2 border-white hover:bg-surface-elevated';
      break;
    case 'ghost':
      // Ghost doesn't use the standard size/height because it's text-like
      return (
        <button
          className={`inline-flex items-center text-brand-green hover:text-brand-darkGreen text-button-md font-bold transition-colors ${className}`}
          {...props}
        >
          {children}
          <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      );
    default:
      variantStyles = 'bg-brand-green text-white hover:bg-brand-darkGreen';
  }

  return (
    <button className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};
