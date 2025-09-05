import { createContext, useContext, useReducer, useEffect } from 'react'

const FavoritesContext = createContext()

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      return state.includes(action.payload)
        ? state.filter((id) => id !== action.payload)
        : [...state, action.payload]
    default:
      return state
  }
}

export function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(
    favoritesReducer,
    [],
    () => JSON.parse(localStorage.getItem('favorites') || '[]')
  )

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state))
  }, [state])

  const toggleFavorite = (id) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id })
  }

  return (
    <FavoritesContext.Provider value={{ favorites: state, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
