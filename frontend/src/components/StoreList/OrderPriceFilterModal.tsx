import { useSetAtom } from 'jotai'

import { storeOrderPriceAtom } from '@/atoms/storeFilter'
import { OrderPriceOption } from '@/constants/store'

import { FilterModal } from './FilterModal'

export const OrderPriceFilterModal = ({
  closeModal,
}: {
  closeModal: () => void
}) => {
  const setOrderPrice = useSetAtom(storeOrderPriceAtom)

  return (
    <FilterModal closeModal={closeModal} title="Minimum Order Amount">
      {OrderPriceOption.map(([price, text]) => (
        <button
          className="flex w-full items-center justify-center border-t border-gray-200 p-4 text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={() => {
            setOrderPrice(price)
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
