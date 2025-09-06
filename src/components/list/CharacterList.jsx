import { useState } from 'react'
import CharacterCard from './CharacterCard'

export default function CharacterList({ characters, listTitle = '' }) {
  const [selectedId, setSelectedId] = useState(null);

  if (!characters || characters.length === 0) {
    return <p className="text-gray-500">No characters found.</p>;
  }

  return (
    <div className="flex flex-col mt-4">
      <h2>{listTitle}</h2>
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
