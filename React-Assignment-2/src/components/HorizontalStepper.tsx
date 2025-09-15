interface Step {
  label: string
  step: number
}

interface StepperProps {
  steps: Step[]
  activeStep: number
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  const totalSteps = steps.length
  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`

  return (
    <div className="mx-auto w-full max-w-4xl px-4">
      <div className="relative flex justify-between">
        {/* Background line */}
        <div className="absolute top-8 left-0 h-1 w-full bg-white/20 rounded-full"></div>
        
        {/* Progress line */}
        <div 
          className="absolute top-8 left-0 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: width }}
        ></div>
        
        {steps.map(({ step, label }) => (
          <div className="relative z-10 flex flex-col items-center" key={step}>
            <div
              className={`flex w-16 h-16 items-center justify-center rounded-2xl border-2 transition-all duration-500 transform ${
                activeStep >= step 
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400 shadow-lg shadow-indigo-500/30 scale-110' 
                  : 'bg-white/10 border-white/30 backdrop-blur-sm'
              } ${
                activeStep === step ? 'animate-pulse' : ''
              }`}
            >
              {activeStep > step ? (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className={`text-lg font-bold ${
                  activeStep >= step ? 'text-white' : 'text-white/60'
                }`}>
                  {step}
                </span>
              )}
            </div>
            
            <div className="mt-4 text-center">
              <span className={`inline-block font-semibold text-sm transition-colors duration-300 ${
                activeStep >= step ? 'text-white' : 'text-white/60'
              }`}>
                {label}
              </span>
              {activeStep === step && (
                <div className="mt-1 w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mx-auto animate-pulse"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stepper
