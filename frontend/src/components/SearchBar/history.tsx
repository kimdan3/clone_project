import { ChangeEvent, useTransition } from 'react'

import { useSetAtom } from 'jotai'
import { BiSearch } from 'react-icons/bi'

import { searchQueryAtom } from '@/atoms/search'

export const HistorySearchBar = () => {
  const [, startTransition] = useTransition()
  const setSearchQuery = useSetAtom(searchQueryAtom)

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearchQuery(e.target.value)
    })
  }

  return (
    <div className="flex flex-row border-b-8 border-b-gray-100 p-4">
      <input
        className="flex-grow rounded-lg bg-gray-200 px-3"
        placeholder="Search for ordered menu/store"
        onChange={handleInput}
      ></input>
      <BiSearch className="m-2 text-2xl" />
    </div>
  )
}
