import { useState, useEffect, useRef } from 'react'
import FiltersForm from './FiltersForm'

export default function FiltersDropdown({ initial, onApply, onClose }) {
  const ref = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    setIsAnimating(true);

    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsAnimating(false);
        timeoutRef.current = setTimeout(() => {
          onClose();
        }, 300);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      clearTimeout(timeoutRef.current);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className={`absolute mt-2 w-[343px] p-4 bg-white border border-(--color-border) rounded-lg shadow-lg z-50
                  transition-all duration-300 ease-out
                  ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
    >
      <FiltersForm initial={initial} onApply={onApply} />
    </div>
  );
}
