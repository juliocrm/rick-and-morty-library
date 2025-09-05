import { useFavorites } from '../../context/FavoritesContext'

export default function FavoriteButton({ characterId, className }) {
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.includes(characterId)
    const classNames = `!p-1 w-8 h-8 !bg-white items-center justify-center !rounded-full border hover:bg-gray-100 transition ${className}`

  return (
    <button
      onClick={() => toggleFavorite(characterId)}
      className={classNames}
      aria-label="Toggle favorite"
    >
      {isFavorite ? (
        <span className="text-green-500 text-xl leading-none">♥</span>
      ) : (
        <span className="text-gray-400 text-xl leading-none">♡</span>
      )}
    </button>
  )
}
