import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { GET_CHARACTER_BY_ID } from '../apollo/queries'
import CharacterDetail from '../components/detail/CharacterDetail'
import BackButton from '../components/detail/BackButton'
import useIsDesktop from '../hooks/useIsDesktop'

export default function DetailPage() {
  const { id } = useParams()
  const { data, loading, error } = useQuery(GET_CHARACTER_BY_ID, {
    variables: { id },
  })
  const isDesktop = useIsDesktop()

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
        <p className="text-red-500">Error loading character</p>
      </div>
    )
  }

  if (!data?.character) {
    return (
      <div className="p-4">
        <p className="text-gray-500">Character not found</p>
      </div>
    )
  }

  return (
    <div className="p-4 px-[100px] pt-[40px]">
      {!isDesktop && <BackButton />}
      <CharacterDetail character={data.character} />
    </div>
  )
}
