import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

export function StarRating({ rating, size = 'md' }: { rating?: number, size?: 'sm' | 'md' | 'lg' }) {
  if (!rating) return null

  const stars = [...Array(Math.floor(rating))]
  let halfstar = false
  if (rating % 1 >= 0.5) {
    halfstar = true
  }
  let emptystar = 5 - stars.length
  if (halfstar) emptystar -= 1

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  }

  return (
    <div className={`flex items-center gap-0.5 ${sizeClasses[size]}`}>
      {stars.map((_, i) => (
        <FaStar key={i} className="text-yellow-400" />
      ))}
      {halfstar && <FaStarHalfAlt className="text-yellow-400" />}
      {[...Array(emptystar)].map((_, i) => (
        <FaRegStar key={i} className="text-yellow-400" />
      ))}
    </div>
  )
}
