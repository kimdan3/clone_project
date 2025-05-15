import { Dispatch, SetStateAction } from 'react'

import { FaRegStar, FaStar } from 'react-icons/fa'

export function StarRatingInput({
  rating = 5,
  setRating,
  size = 'md',
}: {
  rating?: number
  setRating: Dispatch<SetStateAction<number>>
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  }

  return (
    <div className={`flex items-center gap-1 ${sizeClasses[size]}`}>
      {[...Array(5)].map((_, i) => (
        <button 
          onClick={() => setRating(i + 1)} 
          key={i}
          className="hover:scale-110 transition-transform"
        >
          {i < rating ? (
            <FaStar className="text-yellow-400" />
          ) : (
            <FaRegStar className="text-yellow-400" />
          )}
        </button>
      ))}
    </div>
  )
}
