import { useState, useEffect, useRef } from 'react'
import FiltersForm from './FiltersForm'

export default function FiltersDropdown({ initial, onApply, onClose }) {
  const ref = useRef(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)

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
      className={`absolute mt-2 w-[343px] p-4 bg-white border border-(--color-border) rounded-lg shadow-lg z-50
                  transition-all duration-200 ease-out
                  ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
    >
      <FiltersForm initial={initial} onApply={onApply} />
    </div>
  )
}
