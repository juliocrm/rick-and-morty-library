import CharacterCard from './CharacterCard'

export default function CharacterList({ characters }) {
  if (!characters || characters.length === 0) {
    return <p className="text-gray-500">No characters found.</p>
  }

  return (
    <div className="flex flex-col gap-2">
      {characters.map((char) => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </div>
  )
}
