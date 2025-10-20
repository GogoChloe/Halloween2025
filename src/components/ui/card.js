import { forwardRef } from "react";

const Card = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    />
  );
});

Card.displayName = "Card";

export { Card };
