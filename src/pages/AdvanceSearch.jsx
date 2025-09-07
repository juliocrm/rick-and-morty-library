import { useQuery } from '@apollo/client/react'
import { GET_CHARACTERS } from '../apollo/queries'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { MdArrowBack } from 'react-icons/md'
import CharacterList from '../components/list/CharacterList'
import useDebounce from '../hooks/useDebounce'
import FilterSummary from '../components/list/FilterSummary'

export default function ListPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { favorites, toggleFavorite } = useFavorites();
  const debouncedSearch = useDebounce(search, 500);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


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
  });

  const characters = data?.characters?.results || []
  const starredCharacters = characters.filter(c => favorites.includes(c.id));
  const otherCharacters = characters.filter(c => !favorites.includes(c.id));
  const activeFilters = Object.values(filters).filter(v => v && v !== 'all').length;

  return (
    <div className="p-4">

      <div className='relative w-full'>
        <button onClick={() => navigate(-1)} 
            className="absolute left-[-8px] text-(--color-primary) !bg-transparent !p-0 text-xl h-6 w-8 flex items-center justify-center">
            <MdArrowBack className='w-8 h-6' />
        </button>
        <h1 className="w-full pb-8 text-center !text-base font-bold">Advanced Search</h1>
      </div>
      
      {activeFilters > 0 && <FilterSummary resultsCount={characters.length} activeFilters={activeFilters}></FilterSummary>}
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error loading characters</p>}
      {!loading && !error && <CharacterList characters={starredCharacters} listTitle='STARRED CHARACTERS' className={'!mt-10'}/>}
      {!loading && !error && <CharacterList characters={otherCharacters} listTitle='CHARACTERS' feedback={true} />}
    </div>
  )
}
