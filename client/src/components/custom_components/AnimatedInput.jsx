import { useState } from "react";

export default function AnimatedInput({
  label,
  type = "text",
  value,
  onChange,
  error,
}) {
  const [focused, setFocused] = useState(false);

  const isActive = focused || value;

  return (
    <div className="relative w-full">
      {/* Input */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          peer w-full px-4 pt-5 pb-2 text-sm rounded-xl
          bg-white border
          transition-all duration-300 ease-out
          focus:outline-none
          ${error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-600"}
        `}
      />

      {/* Floating Label */}
      <label
        className={`
          absolute left-4 text-gray-500 pointer-events-none
          transition-all duration-300 ease-out
          ${isActive
            ? "top-2 text-xs text-blue-600"
            : "top-4 text-sm"}
        `}
      >
        {label}
      </label>

      {/* Bottom glow line */}
      <span
        className={`
          absolute left-0 bottom-0 h-0.5 w-full rounded-full
          transition-all duration-300
          ${focused
            ? error
              ? "bg-red-500"
              : "bg-blue-600"
            : "bg-transparent"}
        `}
      />

      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
