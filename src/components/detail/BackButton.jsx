import { useNavigate } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'

export default function BackButton() {
  const navigate = useNavigate()
  return (
    <button onClick={() => navigate(-1)} 
        className="left-[-8px] text-(--color-primary) !bg-transparent !p-0 text-xl h-8 w-8 flex items-center justify-center">
        <MdArrowBack size={21} />
    </button>
  )
}
