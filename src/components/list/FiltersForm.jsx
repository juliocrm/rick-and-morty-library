import { useState } from 'react'
import FilterGroup from './FilterGroup'

export default function FiltersForm({ initial, onApply }) {
  const [characterType, setCharacterType] = useState(initial.characterType || 'all')
  const [species, setSpecies] = useState(initial.species || 'all')

  const handleApply = () => {
    onApply({ characterType, species })
  }

  return (
    <div className="flex flex-col gap-6">
      <FilterGroup
        label="Characters"
        value={characterType}
        onChange={setCharacterType}
        options={[
          { label: 'All', value: 'all' },
          { label: 'Starred', value: 'starred' },
          { label: 'Others', value: 'others' },
        ]}
      />
      <FilterGroup
        label="Specie"
        value={species}
        onChange={setSpecies}
        options={[
          { label: 'All', value: 'all' },
          { label: 'Human', value: 'human' },
          { label: 'Alien', value: 'alien' },
        ]}
      />
      <button
        onClick={handleApply}
        className="mt-4 py-2 rounded-md !bg-(--color-primary-100) text-(--color-text-secondary) font-medium"
      >
        Filter
      </button>
    </div>
  )
}
