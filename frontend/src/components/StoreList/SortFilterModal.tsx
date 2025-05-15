import { useSetAtom } from 'jotai'

import { storeSortAtom } from '@/atoms/storeFilter'
import { SortText, StoreSort } from '@/constants/store'

import { FilterModal } from './FilterModal'

export const SortFilterModal = ({ closeModal }: { closeModal: () => void }) => {
  const setSortFilter = useSetAtom(storeSortAtom)

  return (
    <FilterModal closeModal={closeModal} title="Sort">
      {Object.values(StoreSort).map((sort) => (
        <button
          className="flex w-full items-center justify-center border-t border-gray-200 p-4 text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={() => {
            setSortFilter(sort)
            closeModal()
          }}
          key={sort}
        >
          {SortText[sort]}
        </button>
      ))}
    </FilterModal>
  )
}
