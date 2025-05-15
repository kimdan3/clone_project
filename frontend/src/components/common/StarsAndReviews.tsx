import { FaStar } from 'react-icons/fa'

export const StarsAndReviews = ({
  rating,
  reviewCount,
  size = 'md',
}: {
  rating?: number
  reviewCount?: number
  size?: 'sm' | 'md' | 'lg'
}) => {
  if (!rating) {
    return null
  }

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  return (
    <div className={`flex items-center gap-1 ${sizeClasses[size]}`}>
      <FaStar className="text-yellow-400" />
      <span className="text-gray-600">
        {rating?.toFixed(1)}
        {reviewCount !== undefined && (
          <span className="text-gray-500"> ({reviewCount})</span>
        )}
      </span>
    </div>
  )
}
