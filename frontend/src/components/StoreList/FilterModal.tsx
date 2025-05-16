import { PropsWithChildren } from 'react'
import { IoClose } from 'react-icons/io5'
import { Portal } from 'react-portal'

export const FilterModal = ({
  closeModal,
  children,
  title,
}: PropsWithChildren<{ 
  closeModal: () => void
  title: string 
}>) => {
  return (
    <>
      <Portal>
        <div
          className="fixed top-0 z-40 h-screen w-screen bg-gray-500/50"
          onClick={closeModal}
        />
        <div className="fixed bottom-0 z-50 w-full bg-white rounded-t-2xl pb-10">
          <div className="relative flex items-center justify-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold">{title}</h2>
            <button
              className="absolute right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={closeModal}
            >
              <IoClose className="text-xl" />
            </button>
          </div>
          <div className="mt-2">
            {children}
          </div>
        </div>
      </Portal>
    </>
  )
}
