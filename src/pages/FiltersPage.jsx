import { useNavigate, useLocation } from 'react-router-dom'
import FiltersForm from '../components/list/FiltersForm'
import { MdArrowBack } from 'react-icons/md'

export default function FiltersPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const initial = location.state?.filters || {}

  const handleApply = (filters) => {
    navigate('/', { state: { filters } })
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <button onClick={() => navigate(-1)} 
        className="text-purple-600 !p-0 text-xl w-8 flex items-center justify-center">
        <MdArrowBack />
      </button>
      <h1 className="text-lg font-bold">Filters</h1>
      <FiltersForm initial={initial} onApply={handleApply} />
    </div>
  )
}
