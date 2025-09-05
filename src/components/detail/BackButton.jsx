import { useNavigate } from 'react-router-dom'

export default function BackButton() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-blue-600 hover:underline mb-4"
    >
      ←
    </button>
  )
}
