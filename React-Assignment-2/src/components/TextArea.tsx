import { type ChangeEvent, type TextareaHTMLAttributes, useEffect, useRef } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  autoHeight?: boolean // Enable auto-height adjustment
  resize?: 'none' | 'both' | 'horizontal' | 'vertical' // Control resizing
  className?: string // Allow custom classes
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Enter text...',
  autoHeight = true,
  resize = 'vertical',
  className = '',
  ...props
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (autoHeight && textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }, [value, autoHeight])

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="mb-3 block text-sm font-semibold text-white/90 flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          ref={textAreaRef}
          value={value}
          rows={6}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border-2 bg-white/10 backdrop-blur-sm px-4 py-4 text-white placeholder:text-white/50 transition-all duration-300 focus:outline-none border-white/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 hover:border-white/40 ${
            resize === 'none' ? 'resize-none' : ''
          } ${resize === 'both' ? 'resize' : ''} ${
            resize === 'horizontal' ? 'resize-x' : ''
          } ${resize === 'vertical' ? 'resize-y' : ''}`}
          style={{ resize }}
          {...props}
        />
        <div className="absolute bottom-3 right-3 text-xs text-white/40">
          {value.length} characters
        </div>
      </div>
      <div className="mt-2 text-xs text-white/60">
        📝 Share your story and explain why you need this scholarship
      </div>
    </div>
  )
}

export default TextArea
