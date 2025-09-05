import { useQuery } from '@apollo/client/react'
import { GET_CHARACTERS } from '../apollo/queries'
import CharacterList from '../components/list/CharacterList'

export default function ListPage() {
  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { page: 1 },
  })

  if (loading) {
    return (
      <div className="p-4">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">Error loading characters</p>
      </div>
    )
  }

  const characters = data?.characters?.results || []

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Rick and Morty list</h1>
      <CharacterList characters={characters} />
    </div>
  )
}
