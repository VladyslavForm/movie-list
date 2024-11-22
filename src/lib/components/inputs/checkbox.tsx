import React, {forwardRef, InputHTMLAttributes} from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string | boolean
  isRequired?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({id, className, label, error, isRequired, ...rest}, ref) => {
    return (
      <div className={`${className ?? ''} flex items-center justify-center relative`}>
        <input
          {...rest}
          ref={ref}
          id={id}
          type="checkbox"
          className="w-5 h-5 text-primary bg-input border-input rounded-main"
        />
        {label && (
          <label
            htmlFor={id}
            className="ml-3 text-body-small text-white"
          >
            {label}
            {isRequired && <span className="text-error"> *</span>}
          </label>
        )}
        {typeof error === 'string' && error && (
          <div className="absolute -bottom-5 text-error text-xs mt-1">
            {error}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
