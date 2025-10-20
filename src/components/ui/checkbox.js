'use client';

import React, { forwardRef } from "react";

const Checkbox = forwardRef(({ className = "", checked, onCheckedChange, disabled, ...props }, ref) => {
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('🔲 Checkbox clicked! disabled:', disabled, 'checked:', checked);
    if (!disabled && onCheckedChange) {
      console.log('🔲 Calling onCheckedChange with:', !checked);
      onCheckedChange(!checked);
    }
  };

  return (
    <div 
      className="relative inline-flex items-center justify-center cursor-pointer p-2 z-50"
      onClick={handleClick}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
    >
      <div
        onClick={handleClick}
        className={`
          h-6 w-6 rounded border-3 appearance-none cursor-pointer transition-all duration-200
          flex items-center justify-center flex-shrink-0
          ${checked 
            ? 'bg-orange-500 border-orange-500' 
            : 'bg-transparent border-gray-400 hover:border-purple-500 hover:bg-purple-500/10'
          }
          ${disabled ? 'border-gray-600 bg-gray-800 cursor-not-allowed opacity-50' : ''}
          ${className}
        `}
      >
        {checked && (
          <svg
            className="h-4 w-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={() => {}} // Controlled by onClick
        disabled={disabled}
        className="sr-only"
        {...props}
      />
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
