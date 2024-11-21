import React, {forwardRef, InputHTMLAttributes} from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string,
  error?: string | boolean
  isRequired?: boolean
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({
    id,
    className,
    type,
    error,
    ...rest
  }, ref) => {

    return (
      <div className={`${className ?? ''} flex flex-col relative`}>
        <input
          {...rest}
          ref={ref}
          id={id}
          type={type}
          className="relative text-body-small text-white w-full bg-input outline outline-input rounded-main px-4 py-3 focus:outline-input focus:bg-white focus:text-input"
        />
        {typeof error === 'string' && error && <div className="absolute -bottom-5 text-fac-red-500 text-xs mt-1">
          {error}
        </div>}
      </div>
    )
  })

TextInput.displayName = 'TextInput'
