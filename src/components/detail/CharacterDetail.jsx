import { useState, useEffect } from 'react'
import FavoriteButton from './FavoriteButton'
import Property from './Property'
import useCharacterComments from '../../hooks/useCharacterComments'

export default function CharacterDetail({ character }) {
  return (
    <div className="pt-4 text-left gap-4 w-full">
      <div className="relative h-[75px] w-[75px]">
        <img
            src={character.image}
            alt={character.name}
            className="absolute  w-[75px] h-[75px] rounded-full object-cover"
        />
        <FavoriteButton className="absolute bottom-0 right-[-10px] z-auto" characterId={character.id} />
      </div>        
      <h1 className="pt-2 text-2xl font-bold">{character.name}</h1>

      <div className="pt-8 grid grid-cols-1 divide-y divide-gray-300 gap-4">
        <Property title="Specie" value={character.species} />
        <Property title="Status" value={character.status} />
        <Property title="Gender" value={character.gender} />
      </div>
      <CommentSection characterId={character.id} />
    </div>
  )
}

function CommentSection({ characterId }) {
  const { comment, saveComment } = useCharacterComments(characterId)
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    setNewComment(comment)
  }, [comment])

  const handleSave = () => {
    saveComment(newComment)
  }

  const hasChanged = newComment !== comment

  return (
    <div className="pt-8">
      <h2 className="text-lg font-semibold mb-4">Notes</h2>
      <div className="flex gap-2 mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your notes about this character..."
          className="flex-1 p-2 border border-gray-300 rounded-md outline-none min-h-[100px]"
          rows={4}
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={!hasChanged}
          className={`p-2 text-white rounded-md w-full sm:w-auto sm:px-6 ${hasChanged 
            ? '!bg-(--color-primary) hover:opacity-90' 
            : '!bg-(--color-bg-disabled) !text-(--color-text-secondary) cursor-not-allowed'}`}
        >
          Save
        </button>
      </div>
    </div>
  )
}
