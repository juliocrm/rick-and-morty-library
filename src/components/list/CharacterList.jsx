import { useState, useMemo } from 'react';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import CharacterCard from './CharacterCard';
import { useSelection } from '../../components/list/SelectionContext';

export default function CharacterList({ characters, className, feedback = false, listTitle = '' }) {
  const { selectedId, setSelectedId } = useSelection();
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = () => {
    if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('asc');
    }
  };

  const sortedCharacters = useMemo(() => {
    if (sortOrder === 'none' || !characters) {
      return characters;
    }
    return [...characters].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      }
      return nameB.localeCompare(nameA);
    });
  }, [characters, sortOrder]);

  if ((!characters || characters.length === 0) && feedback) {
    return <p className="text-gray-500 mt-6">No characters found.</p>;
  }

  const classNames = `flex justify-between items-end ${className}`;

  return (
    <div className="flex flex-col">
      <div className={classNames}>
        {(feedback || characters.length > 0) && <h2 className='mb-4 mt-2 sm:mt-6 !text-xs font-semibold !text-(--color-text-secondary)'>{listTitle} {`(${characters.length})`}</h2>}
        <button onClick={handleSort} className="!p-1 m-1 mx-3 translate-x-[2px] translate-y-[-2px] !outline-none items-center rounded-full hover:bg-gray-100 !bg-transparent">
          {sortOrder === 'asc' ? <AiOutlineSortAscending size={24} className="text-gray-600 !text-(--color-text-secondary)" /> : <AiOutlineSortDescending size={24} className="text-gray-600 !text-(--color-text-secondary)" />}
        </button>
      </div>
      {sortedCharacters.map((char) => (
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
