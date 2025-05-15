import { useState } from 'react'

import { useAtomValue } from 'jotai'

import { storeSortAtom } from '@/atoms/storeFilter'
import { SortText } from '@/constants/store'

import { DeliveryFilterModal } from './DeliveryFilterModal'
import { OrderPriceFilterModal } from './OrderPriceFilterModal'
import { SortFilterModal } from './SortFilterModal'
import { StoreFilter } from './StoreFilter'

export const StoreFilters = () => {
  const sort = useAtomValue(storeSortAtom)
  const [openFilter, setOpenFilter] = useState<string | undefined>(undefined)

  return (
    <>
      <div className="my-2 flex gap-2 overflow-x-scroll pl-4">
        <StoreFilter
          filterType="Sort"
          currentValue={SortText[sort]}
          onClick={() => setOpenFilter('Sort')}
        />
        <StoreFilter
          filterType="Delivery Fee"
          onClick={() => setOpenFilter('Delivery Fee')}
        />
        <StoreFilter
          filterType="Minimum Order"
          onClick={() => setOpenFilter('Minimum Order')}
        />
      </div>
      {openFilter === 'Sort' && (
        <SortFilterModal closeModal={() => setOpenFilter(undefined)} />
      )}
      {openFilter === 'Delivery Fee' && (
        <DeliveryFilterModal closeModal={() => setOpenFilter(undefined)} />
      )}
      {openFilter === 'Minimum Order' && (
        <OrderPriceFilterModal closeModal={() => setOpenFilter(undefined)} />
      )}
    </>
  )
}
