import CharacterCard from './CharacterCard'
import { useSelection } from '../../components/list/SelectionContext'

export default function CharacterList({ characters, listTitle = '' }) {
  const { selectedId, setSelectedId } = useSelection();

  if (!characters || characters.length === 0) {
    return <p className="text-gray-500">No characters found.</p>;
  }

  return (
    <div className="flex flex-col mt-4">
      <h2 className='ml-4 !text-xs font-semibold !text-(--color-text-secondary)'>{listTitle}</h2>
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
