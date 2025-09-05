import { FiSearch, FiSliders } from 'react-icons/fi'

export default function SearchBar({ value, onChange, onFilterClick  }) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
      <FiSearch className="text-gray-400 text-lg" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search or filter results"
        className="flex-1 bg-transparent outline-none text-sm"
      />
      <FiSliders 
        className="w-[38px] h-[38px] rounded-lg text-(--color-primary) hover:bg-(--color-primary-100) p-2 text-lg cursor-pointer" 
        onClick={onFilterClick}    
    />
    </div>
  )
}
