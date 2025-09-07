import CharacterCard from './CharacterCard'
import { useSelection } from '../../components/list/SelectionContext'

export default function CharacterList({ characters, className, feedback = false, listTitle = '' }) {
  const { selectedId, setSelectedId } = useSelection();
  const classNames = `pl-3 mb-4 mt-2 sm:mt-6 !text-xs font-semibold !text-(--color-text-secondary) ${className}`;

  if ((!characters || characters.length === 0) && feedback) {
    return <p className="text-gray-500 mt-6">No characters found.</p>;
  }

  return (
    <div className="flex flex-col">
      { (feedback || characters.length > 0) && <h2 className={classNames} >{listTitle} {`(${characters.length})`}</h2>}
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
