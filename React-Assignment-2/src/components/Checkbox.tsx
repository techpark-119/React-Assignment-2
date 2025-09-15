interface PropsType {
  label: string
  id?: string
  name?: string
  value?: string
  checked: boolean
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
}

const Checkbox: React.FC<PropsType> = ({
  label,
  id = 'default-checkbox',
  name,
  value,
  checked,
  handleChange,
  disabled = false,
}) => {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
          checked 
            ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-400/50 shadow-lg shadow-indigo-500/10' 
            : 'bg-white/5 border-white/20 hover:border-white/40 hover:bg-white/10'
        } ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            checked={checked}
            disabled={disabled}
            className="sr-only"
            aria-checked={checked}
          />
          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
            checked 
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400 shadow-lg' 
              : 'border-white/40 bg-white/10'
          }`}>
            {checked && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <span className={`font-medium transition-colors duration-300 ${
            checked ? 'text-white' : 'text-white/80'
          }`}>
            {label}
          </span>
          {checked && (
            <div className="mt-1 text-xs text-indigo-300">Selected ✓</div>
          )}
        </div>
        
        {checked && (
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </label>
    </div>
  )
}

export default Checkbox
