interface ReviewSubmitProps {
  formData: {
    personalInfo: {
      name: string
      email: string
      studentId: string
    }
    laptopNeeds: string[]
    scholarshipStatus: string
  }
}

const ReviewSubmit: React.FC<ReviewSubmitProps> = ({ formData }) => {
  const { personalInfo, laptopNeeds, scholarshipStatus } = formData
  const { name, email, studentId } = personalInfo

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">🔍 Review & Submit</h2>
        <p className="text-white/70">Please review your information before submitting</p>
      </div>
      
      <div className="space-y-6">
        {/* Personal Information Card */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h3 className="text-lg font-semibold text-white">Personal Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-white/60 text-sm">Full Name</span>
              <p className="text-white font-medium">{name || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-white/60 text-sm">Email</span>
              <p className="text-white font-medium">{email || 'Not provided'}</p>
            </div>
            <div className="md:col-span-2">
              <span className="text-white/60 text-sm">Student ID</span>
              <p className="text-white font-medium">{studentId || 'Not provided'}</p>
            </div>
          </div>
        </div>
        
        {/* Laptop Preferences Card */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-white">Laptop Preferences</h3>
          </div>
          <div>
            <span className="text-white/60 text-sm">Preferred Brands</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {laptopNeeds.length > 0 ? (
                laptopNeeds.map((brand) => (
                  <span key={brand} className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm border border-indigo-400/30">
                    {brand}
                  </span>
                ))
              ) : (
                <span className="text-white/60 italic">No preferences selected</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Scholarship Need Card */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-lg font-semibold text-white">Scholarship Need</h3>
          </div>
          <div>
            <span className="text-white/60 text-sm">Your Statement</span>
            <div className="mt-2 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-white/90 text-sm leading-relaxed">
                {scholarshipStatus || 'No statement provided'}
              </p>
            </div>
            {scholarshipStatus && (
              <div className="mt-2 text-xs text-white/60">
                {scholarshipStatus.length} characters
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-6 border border-indigo-400/20">
        <div className="flex items-center gap-3 mb-3">
          <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h4 className="text-white font-semibold">Before You Submit</h4>
        </div>
        <ul className="text-white/80 text-sm space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            All information is accurate and complete
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Email address is correct for communication
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Scholarship statement reflects your genuine need
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ReviewSubmit
