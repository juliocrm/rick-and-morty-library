import { useNavigate } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'

export default function BackButton() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-blue-600 hover:underline mb-4"
    >
      <MdArrowBack className='w-8 h-6' />
    </button>
  )
}
