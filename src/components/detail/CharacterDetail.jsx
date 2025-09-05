import FavoriteButton from './FavoriteButton'
import Property from './Property'

export default function CharacterDetail({ character }) {
  return (
    <div className="p-4 text-left gap-4 w-full">
      <div className="relative h-[75px] w-[75px]">
        <img
            src={character.image}
            alt={character.name}
            className="absolute  w-[75px] h-[75px] rounded-full object-cover"
        />
        <FavoriteButton className="absolute bottom-0 right-[-10px] z-auto" characterId={character.id} />
      </div>        
      <h1 className="text-2xl font-bold">{character.name}</h1>

      <div className="pt-4 grid grid-cols-1 divide-y divide-gray-300 gap-4">
        <Property title="Specie" value={character.species} />
        <Property title="Status" value={character.status} />
        <Property title="Gender" value={character.gender} />
      </div>

    </div>
  )
}
