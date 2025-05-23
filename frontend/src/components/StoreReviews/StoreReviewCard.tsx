import Image from 'next/image'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'

import { StarRating } from '@/components/common/StarRating'
import { getDayDiff } from '@/lib/date'
import { hideName } from '@/lib/name'
import { useUserById } from '@/queries/user'
import { Review } from '@/types/review'

export const StoreReviewCard = ({ review }: { review: Review }) => {
  const { data: user } = useUserById(review.user)

  if (!user) return null

  const dayDiff = getDayDiff(
    review.createdAt ? new Date(review.createdAt) : new Date()
  )

  return (
    <div className="border-b border-b-gray-200 pb-4">
      <div>{hideName(user?.name ?? '')}</div>
      <div className="flex">
        <div className="text-yellow-400">
          <StarRating rating={review.rating} />
        </div>
        {dayDiff > 0 ? `${dayDiff} days ago` : 'Today'}
      </div>
      {review.image && (
        <Image
          src={review.image}
          width={300}
          height={300}
          className="object-cover"
          alt="Review image"
        />
      )}
      {review.review && <p>{review.review}</p>}
      <div className="flex flex-wrap gap-2 pt-4">
        {review.menus.map((menu) => (
          <div
            key={menu._id}
            className={`flex items-center gap-1 rounded-full px-2 ${
              menu.like 
                ? 'bg-blue-100 text-blue-600' 
                : menu.dislike 
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600'
            }`}
          >
            {menu.like && <FaThumbsUp />}
            {menu.dislike && <FaThumbsDown />}
            {menu.name}
          </div>
        ))}
      </div>
    </div>
  )
}
