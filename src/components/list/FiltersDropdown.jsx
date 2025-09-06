import { useEffect, useRef } from 'react'
import FiltersForm from './FiltersForm'

export default function FiltersDropdown({ initial, onApply, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  return (
    <div
      ref={ref}
      className="absolute mt-2 w-[343px] p-4 bg-white border border-(--color-border) rounded-lg shadow-lg z-50"
    >
      <FiltersForm initial={initial} onApply={onApply} />
    </div>
  )
}
