import { useFavorites } from '../../context/FavoritesContext'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

export default function FavoriteButton({ characterId, className }) {
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.includes(characterId)
    const classNames = `!p-1 w-8 h-8 !bg-white items-center justify-center 
      !rounded-full border hover:bg-gray-100 transition items-center justify-items-center ${className}`

  return (
    <button
      onClick={() => toggleFavorite(characterId)}
      className={classNames}
      aria-label="Toggle favorite"
    >
      {isFavorite ? (
        <MdFavorite className="text-green-500 text-xl translate-y-[1px]" />
      ) : (
        <MdFavoriteBorder className="text-gray-400 text-xl" />
      )}
    </button>
  )
}
