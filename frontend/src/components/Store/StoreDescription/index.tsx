import { useAtomValue } from 'jotai'

import { storeIdAtom } from '@/atoms/storeId'
import { KRW } from '@/lib/currency'
import { useStore } from '@/queries/store'

export const StoreDescription = () => {
  const storeId = useAtomValue(storeIdAtom)
  const { data } = useStore(storeId)

  if (!data) return null

  return (
    <div className="grid grid-cols-4 gap-2 px-4 py-4 text-gray-700">
      <div>Delivery Fee</div>
      <div className="col-span-3">{KRW(data.deliveryPrice)}</div>
      <div>Minimum Order</div>
      <div className="col-span-3">{KRW(data.minimumOrderPrice)}</div>
    </div>
  )
}
