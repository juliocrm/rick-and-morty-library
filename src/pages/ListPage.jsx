import { useQuery } from '@apollo/client/react'
import { GET_CHARACTERS } from '../apollo/queries'
import { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import CharacterList from '../components/list/CharacterList'
import SearchBar from '../components/list/SearchBar'
import useDebounce from '../hooks/useDebounce'
import FiltersDropdown from '../components/list/FiltersDropdown'
import FilterSummary from '../components/list/FilterSummary'
import useIsDesktop from '../hooks/useIsDesktop'


export default function ListPage() {
  const [page, setPage] = useState(1);
  const [allCharacters, setAllCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ characterType: 'all', species: 'all' }); 
  const [showFilters, setShowFilters] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const debouncedSearch = useDebounce(search, 500);
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isDesktop) {
      setShowFilters(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (location.state?.filters) {
      setFilters(location.state.filters);
    }
  }, [location.state]);

  const apiFilters = useMemo(() => {
    const { characterType, ...rest } = filters;
    for (const key in rest) {
      if (rest[key] === 'all' || !rest[key]) {
        delete rest[key];
      }
    }
    return rest;
  }, [filters]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, apiFilters]);

  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: {
      page,
      filter: {
        name: debouncedSearch || undefined,
        ...apiFilters
      },
    }
  });

  useEffect(() => {
    if (data?.characters?.results) {
      if (page === 1) {
        setAllCharacters(data.characters.results);
      } else {
        setAllCharacters(prev => [...prev, ...data.characters.results]);
      }
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 100 || loading) {
        return;
      }
      if (data?.characters?.info?.next) {
        setPage(data.characters.info.next);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, data]);

  const handleOpenFilters = () => {
    if (!isDesktop) {
      navigate('/filters', { state: { filters } })
    } else {
      setShowFilters((prev) => !prev)
    }
  }

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
    setShowFilters(false)
  }

  const { starredCharacters, otherCharacters } = useMemo(() => {
    const allStarred = allCharacters.filter(c => favorites.includes(c.id));
    const allOthers = allCharacters.filter(c => !favorites.includes(c.id));

    if (filters.characterType === 'starred') {
      return { starredCharacters: allStarred, otherCharacters: [] };
    }
    if (filters.characterType === 'others') {
      return { starredCharacters: [], otherCharacters: allOthers };
    }
    return { starredCharacters: allStarred, otherCharacters: allOthers };
  }, [allCharacters, favorites, filters.characterType]);

  const activeFilters = Object.values(filters).filter(v => v && v !== 'all').length;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-6 mt-4 md:mt-[26px]">Rick and Morty list</h1>
      <SearchBar value={search} onChange={setSearch} onFilterClick={handleOpenFilters} />
      {showFilters && isDesktop && (
        <FiltersDropdown
          initial={filters}
          onApply={handleApplyFilters}
          onClose={() => null}
        />
      )}
      {activeFilters > 0 && isDesktop && 
        <FilterSummary resultsCount={data?.characters?.info?.count || 0} activeFilters={activeFilters}></FilterSummary>
      }
      {loading && 
        <p className="text-gray-500 mt-4">Loading...</p>
      }
      {error && 
        <p className="text-red-500 mt-4">Error loading characters</p>
      }
      {starredCharacters.length === 0 && otherCharacters.length === 0 && !loading && !error && 
        <p className="p-4 text-gray-500 mt-6">No characters found.</p>
      }
      {!loading && !error && (
        <>
          <CharacterList characters={starredCharacters} listTitle='STARRED CHARACTERS' className={`pl-3 ${activeFilters > 0 && isDesktop ? 'sm:!mt-0' : '!mt-8 sm:!mt-10'}`} />
          <CharacterList characters={otherCharacters} listTitle='CHARACTERS' className={'!mt-4 pl-3'} />
        </>
      )}
    </div>
  )
}
