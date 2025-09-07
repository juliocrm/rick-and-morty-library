import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../detail/FavoriteButton';
import styles from './style/CharacterCard.module.css';

export default function CharacterCard({ character, onClick, selected }) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    if (onClick) onClick();
    navigate(`/character/${character.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`flex items-center gap-4 p-3 !px-5
        hover:bg-gray-50 transition 
        ${selected ? '!bg-(--color-selected)' : 'bg-white'}
        ${styles.card}`}
      role="button"
      tabIndex={0}
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-[32px] h-[32px] rounded-full object-cover"
        loading="lazy"
      />
      <div>
        <h2 className="font-semibold text-left text-(--color-text-primary)">{character.name}</h2>
        <p className="text-left text-(--color-text-secondary)">{character.species}</p>
      </div>
      <FavoriteButton className="ml-auto" characterId={character.id} onClick={e => e.stopPropagation()} />
    </div>
  );
}
