
import React from "react";

// INPUTS
export const Input = React.forwardRef(
  (
    { className, error, ...props },
    ref
  ) => {
    return (
      <div className={`input ${props.type === "hidden" ? props.type : ""}`}>
        <input
          ref={ref}
          className={`input ${className}`}
          {...props}
        />
        {error && <div className="text-[11px] text-red-600">{error}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";

export const Button = React.forwardRef(({ children, className, loading, ...props }, ref) => {
    const variantClasses = {
      primary: "primary-btn",
      secondary: "secondary-btn",
    };

    const variantClass = variantClasses[props.variant] || variantClasses.primary;

    return (
      <button
        ref={ref}
        className={`${variantClass} ${className}`}
        {...props}
      >
        {loading ? "Wait..." : children}
      </button>
    );
  }
);
Button.displayName = "Button";