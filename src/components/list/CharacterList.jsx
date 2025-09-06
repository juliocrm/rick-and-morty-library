import CharacterCard from './CharacterCard'
import { useSelection } from '../../components/list/SelectionContext'

export default function CharacterList({ characters, className, listTitle = '' }) {
  const { selectedId, setSelectedId } = useSelection();
  const classNames = `ml-4 mb-4 mt-6 !text-xs font-semibold !text-(--color-text-secondary) ${className}`;

  if (!characters || characters.length === 0) {
    return <p className="text-gray-500">No characters found.</p>;
  }

  return (
    <div className="flex flex-col">
      <h2 className={classNames}>{listTitle} {`(${characters.length})`}</h2>
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
