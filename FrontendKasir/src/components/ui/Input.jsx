import { forwardRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      placeholder,
      error,
      icon: Icon,
      required = false,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

    const Component = type === "textarea" ? "textarea" : "input";
    return (
      <div className="w-full space-y-1.5 my-5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div
          className={`
            relative flex items-center
            rounded-2xl border bg-white
            transition-all duration-200
            ${error ? "border-red-500" : "border-gray-300"}
            focus-within:ring-2
            ${
              error
                ? "focus-within:ring-red-200"
                : "focus-within:ring-black/10"
            }
            ${className}
          `}
        >
          {Icon && (
            <div className="pl-4 text-gray-400">
              <Icon className="w-5 h-5" />
            </div>
          )}

          <Component
            id={inputId}
            ref={ref}
            type={Component === "input" ? (isPassword && showPassword ? "text" : type) : undefined}
            placeholder={placeholder}
            aria-invalid={!!error}
            className={`
              w-full bg-transparent
              py-3 text-sm
              placeholder:text-gray-400
              focus:outline-none
              ${Icon ? "pl-2 pr-4" : "px-4"}
            `}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="pr-4 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;