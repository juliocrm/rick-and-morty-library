import { useNavigate, useLocation } from 'react-router-dom'
import FiltersForm from '../components/list/FiltersForm'
import { MdArrowBack } from 'react-icons/md'
import useIsDesktop  from '../hooks/useIsDesktop'

export default function FiltersPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const initial = location.state?.filters || {}
  const isDesktop = useIsDesktop();

  const handleApply = (filters) => {
    navigate('/', { state: { filters } })
  }

  return (
    <div className="p-4 flex flex-col h-dvh">
      <div className='relative w-full'>
        <button onClick={() => navigate(-1)} 
            className="absolute left-[-8px] text-(--color-primary) !bg-transparent !p-0 text-xl h-6 w-8 flex items-center justify-center">
            <MdArrowBack className='w-8 h-6' />
        </button>
        <h1 className="w-full text-center !text-base font-bold">Filters</h1>
      </div>
      <FiltersForm initial={initial} onApply={handleApply} />
    </div>
  )
}
