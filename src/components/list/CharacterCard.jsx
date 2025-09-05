import { Link } from 'react-router-dom'

export default function CharacterCard({ character }) {
  return (
    <Link
      to={`/character/${character.id}`}
      className="flex items-center gap-4 p-3 border-t border-(--color-border) hover:bg-gray-50 transition"
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
    </Link>
  )
}
