import { useState } from 'react'
import CharacterCard from './CharacterCard'

export default function CharacterList({ characters }) {
  const [selectedId, setSelectedId] = useState(null);

  if (!characters || characters.length === 0) {
    return <p className="text-gray-500">No characters found.</p>;
  }

  return (
    <div className="flex flex-col">
      {characters.map((char) => (
        <CharacterCard
          key={char.id}
          character={char}
          selected={char.id === selectedId}
          onClick={() => { setSelectedId(char.id)}}
        />
      ))}
    </div>
  );
}
