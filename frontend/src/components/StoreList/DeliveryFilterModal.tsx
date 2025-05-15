import { useSetAtom } from 'jotai'

import { storeDeliveryPriceAtom } from '@/atoms/storeFilter'
import { DeliveryOption } from '@/constants/store'

import { FilterModal } from './FilterModal'

export const DeliveryFilterModal = ({
  closeModal,
}: {
  closeModal: () => void
}) => {
  const setDeliveryPrice = useSetAtom(storeDeliveryPriceAtom)

  return (
    <FilterModal closeModal={closeModal} title="Delivery Fee">
      {DeliveryOption.map(([price, text]) => (
        <button
          className="flex w-full items-center justify-center border-t border-gray-200 p-4 text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={() => {
            setDeliveryPrice(price)
            closeModal()
          }}
          key={price}
        >
          {text}
        </button>
      ))}
    </FilterModal>
  )
}
