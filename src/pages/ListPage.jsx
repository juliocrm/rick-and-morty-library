import { useQuery } from '@apollo/client/react'
import { GET_CHARACTERS } from '../apollo/queries'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CharacterList from '../components/list/CharacterList'
import SearchBar from '../components/list/SearchBar'
import useDebounce from '../hooks/useDebounce'
import FiltersDropdown from '../components/list/FiltersDropdown'

export default function ListPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const debouncedSearch = useDebounce(search, 500);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setShowFilters(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (location.state?.filters) {
      setFilters(location.state.filters);
    }
  }, [location.state]);

  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { 
        page: 1,
        filter: {
          name: debouncedSearch || undefined,
          species: filters.species !== 'all' ? filters.species : undefined,
      },
    },
  })

  const handleOpenFilters = () => {
    if (isMobile) {
      navigate('/filters', { state: { filters } })
    } else {
      setShowFilters((prev) => !prev)
    }
  }
  useEffect(() => {
    }, [showFilters]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
    setShowFilters(false)
  }

  const characters = data?.characters?.results || []

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Rick and Morty list</h1>
      <SearchBar value={search} onChange={setSearch} onFilterClick={handleOpenFilters}/>
      {showFilters && !isMobile && (
          <FiltersDropdown
            initial={filters}
            onApply={handleApplyFilters}
            onClose={() => null}
          />
      )}

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error loading characters</p>}
      {!loading && !error && <CharacterList characters={characters} />}
    </div>
  )
}
