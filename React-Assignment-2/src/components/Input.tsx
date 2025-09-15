import { type ChangeEvent } from 'react'

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password'
  label?: string
  value: string | number
  name: string
  placeholder: string
  error?: string
  disabled?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  icon?: React.ReactNode
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  disabled,
  placeholder,
  label,
  value,
  onChange,
  error,
  icon,
  ...props
}) => {
  return (
    <div className="mb-6">
      {label && (
        <label
          htmlFor={name}
          className="mb-3 block text-sm font-semibold text-white/90 flex items-center gap-2"
        >
          {icon && <span className="text-indigo-400">{icon}</span>}
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full rounded-xl border-2 bg-white/10 backdrop-blur-sm px-4 py-4 text-white placeholder:text-white/50 transition-all duration-300 focus:outline-none ${
            error 
              ? 'border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' 
              : 'border-white/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20'
          } ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-white/40'
          }`}
          {...props}
        />
        {value && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-400 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}
    </div>
  )
}

export default Input
