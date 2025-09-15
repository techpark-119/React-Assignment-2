import React, { type ChangeEvent } from 'react'
import { TextArea } from '../TextArea'

interface EligibilityProps {
  scholarshipStatus: string
  onChange: (field: 'scholarshipStatus', value: string) => void
}

const Eligibility: React.FC<EligibilityProps> = ({
  scholarshipStatus,
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange('scholarshipStatus', e.target.value)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">🎓 Eligibility & Need</h2>
        <p className="text-white/70">Help us understand your situation</p>
      </div>
      
      <TextArea
        label="Why do you need this scholarship?"
        value={scholarshipStatus}
        onChange={handleChange}
        placeholder="Please describe your financial situation, academic goals, and how a laptop would help your studies. Be specific about your circumstances and future plans..."
        autoHeight={true}
        resize="vertical"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-400">✓</span>
            <span className="text-white font-medium text-sm">Include</span>
          </div>
          <ul className="text-white/70 text-xs space-y-1">
            <li>• Financial circumstances</li>
            <li>• Academic goals</li>
            <li>• How laptop will help</li>
            <li>• Future career plans</li>
          </ul>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-400">💡</span>
            <span className="text-white font-medium text-sm">Tips</span>
          </div>
          <ul className="text-white/70 text-xs space-y-1">
            <li>• Be honest and specific</li>
            <li>• Mention your major/field</li>
            <li>• Explain long-term impact</li>
            <li>• Keep it professional</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Eligibility
