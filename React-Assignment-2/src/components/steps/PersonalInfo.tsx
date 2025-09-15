import Input from '../Input'

interface PersonalInfoProps {
  name: string
  email: string
  studentId: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  name,
  email,
  studentId,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">👤 Personal Information</h2>
        <p className="text-white/70">Let's start with your basic details</p>
      </div>
      
      <Input
        type="text"
        name="name"
        label="Full Name"
        placeholder="Enter your full name"
        value={name}
        onChange={onChange}
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>}
      />
      
      <Input
        type="email"
        name="email"
        label="Email Address"
        placeholder="your.email@university.edu"
        value={email}
        onChange={onChange}
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>}
      />
      
      <Input
        type="text"
        name="studentId"
        label="Student ID"
        placeholder="Enter your student identification number"
        value={studentId}
        onChange={onChange}
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>}
      />
    </div>
  )
}

export default PersonalInfo
