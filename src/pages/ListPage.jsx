import { useQuery } from '@apollo/client/react'
import { GET_CHARACTERS } from '../apollo/queries'
import { useState } from 'react'
import CharacterList from '../components/list/CharacterList'
import SearchBar from '../components/list/SearchBar'
import useDebounce from '../hooks/useDebounce'

export default function ListPage() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { 
        page: 1,
        filter: debouncedSearch ? { name: debouncedSearch } : {}
    },
  })

  const characters = data?.characters?.results || []

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Rick and Morty list</h1>
      <SearchBar value={search} onChange={setSearch} />

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error loading characters</p>}
      {!loading && !error && <CharacterList characters={characters} />}
    </div>
  )
}
