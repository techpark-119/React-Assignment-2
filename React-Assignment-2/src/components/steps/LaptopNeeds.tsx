import Checkbox from '../Checkbox'

interface LaptopNeedsProps {
  selectedBrands: string[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const LaptopNeeds: React.FC<LaptopNeedsProps> = ({
  selectedBrands,
  onChange,
}) => {
  const brands = [
    { name: 'Apple', icon: '🍎', description: 'MacBook Pro/Air - Premium performance' },
    { name: 'Dell', icon: '💻', description: 'XPS Series - Professional grade' },
    { name: 'HP', icon: '⚙️', description: 'Pavilion/Envy - Reliable & versatile' },
    { name: 'Lenovo', icon: '🚀', description: 'ThinkPad - Business focused' }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">💻 Laptop Preferences</h2>
        <p className="text-white/70">Select your preferred laptop brands (you can choose multiple)</p>
      </div>
      
      <div className="grid gap-4">
        {brands.map((brand) => (
          <div key={brand.name} className="relative">
            <Checkbox
              id={brand.name.toLowerCase()}
              name="LaptopNeeds"
              value={brand.name}
              label={`${brand.icon} ${brand.name} - ${brand.description}`}
              checked={selectedBrands.includes(brand.name)}
              handleChange={onChange}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-center gap-2 text-white/80 text-sm">
          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Selected: {selectedBrands.length} brand{selectedBrands.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  )
}

export default LaptopNeeds
