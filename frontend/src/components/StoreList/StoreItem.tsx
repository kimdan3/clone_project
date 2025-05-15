import { useMemo } from 'react'

import Link from 'next/link'

import { Store } from '@/types/store'

import { StarsAndReviews } from '../common/StarsAndReviews'

const expandImages = (images?: string[]) => {
  if (!images?.length) return Array(3).fill('/imgs/noimage.svg')
  return images.concat(Array(3 - images.length).fill(images[images.length - 1]))
}

export const StoreItem = ({ store }: { store: Store }) => {
  const images = useMemo(() => expandImages(store.images), [store.images])
  return (
    <Link className="m-4 block" href={`/store/${store._id}`}>
      <div className="grid grid-cols-3 grid-rows-2 gap-1 sm:gap-2">
        {images?.map((image, idx) => (
          <div
            className={`${
              idx === 0
                ? 'col-span-2 row-span-full aspect-auto rounded-l-xl sm:rounded-l-2xl'
                : idx === 1
                ? 'aspect-square rounded-tr-xl sm:rounded-tr-2xl'
                : 'aspect-square rounded-br-xl sm:rounded-br-2xl'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            key={`${image}_${idx}`}
          />
        ))}
      </div>
      <h3 className="mt-2 text-lg font-semibold line-clamp-1">{store.name}</h3>
      <div className="mt-1 flex flex-col gap-1 text-sm">
        <StarsAndReviews
          rating={store.rating}
          reviewCount={store.reviewCount}
        />
        <span className="text-gray-600">Delivery Fee {store.deliveryPrice.toLocaleString()}WON</span>
      </div>
    </Link>
  )
}
