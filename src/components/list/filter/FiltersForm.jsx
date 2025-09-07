import { useState, useMemo } from 'react'
import FilterGroup from './FilterGroup'
import useIsDesktop  from '../../../hooks/useIsDesktop'

export default function FiltersForm({ initial, onApply }) {
  const [characterType, setCharacterType] = useState(initial.characterType || 'all')
  const [species, setSpecies] = useState(initial.species || 'all')
  const isDesktop = useIsDesktop();

  const isChanged = useMemo(() => {
    return (
      characterType !== (initial.characterType || 'all') ||
      species !== (initial.species || 'all')
    );
  }, [characterType, species, initial]);

  const handleApply = () => {
    onApply({ characterType, species })
  }

  return (
    <div className={`flex flex-1 flex-col justify-between
      ${isDesktop? 'max-h-64': ''}`}>
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
      </div>
      <button
        onClick={handleApply}
        className="mt-4 py-2 rounded-md !bg-(--color-primary) !text-sm text-white font-medium disabled:text-(--color-text-secondary) disabled:!bg-(--color-bg-disabled) disabled:cursor-not-allowed"
        disabled={!isChanged}
      >
        Filter
      </button>
    </div>
  )
}
