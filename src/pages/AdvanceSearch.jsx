import { useQuery } from '@apollo/client/react'
import { GET_CHARACTERS } from '../apollo/queries'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { MdArrowBack } from 'react-icons/md'
import CharacterList from '../components/list/CharacterList'
import useDebounce from '../hooks/useDebounce'
import FilterSummary from '../components/list/filter/FilterSummary'
import styles from '../components/list/style/CharacterCard.module.css'

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
    <div className="p-4 pt-6">

      <div className='w-full pb-4 px-2 flex flex-row justify-between items-center mb-4'>
        <button onClick={() => navigate(-1)} 
            className="text-(--color-primary) !bg-transparent !p-0 text-xl h-6 w-8 flex items-center justify-center">
            <MdArrowBack className='w-8 h-6' />
        </button>
        <h1 className="text-center !text-base font-bold">Advanced Search</h1>
        <button onClick={() => navigate('/')} 
            className="text-(--color-primary) !bg-transparent !py-0 !px-2 text-xl flex items-center justify-center">
            Done
        </button>
      </div>
      
      {activeFilters > 0 && <FilterSummary resultsCount={characters.length} activeFilters={activeFilters}></FilterSummary>}
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error loading characters</p>}
      {!loading && !error && <CharacterList characters={starredCharacters} listTitle='STARRED CHARACTERS' className={`!mt-0 !ml-0 content-center !h-[56px] ${styles.card}`}/>}
      {!loading && !error && <CharacterList characters={otherCharacters} listTitle='CHARACTERS' className={`pl-3`} feedback={true} />}
    </div>
  )
}
