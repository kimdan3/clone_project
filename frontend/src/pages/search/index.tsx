import { useEffect } from 'react'

import { useSetAtom } from 'jotai'
import { useSession } from 'next-auth/react'

import { searchQueryAtom } from '@/atoms/search'
import { initialFilter, storeFilterAtom } from '@/atoms/storeFilter'
import { CategoryFilters } from '@/components/CategoryFilter'
import { CartButton } from '@/components/common/CartButton'
import { SearchBar } from '@/components/SearchBar/search'
import { StoreFilters } from '@/components/StoreList/StoreFilters'
import { StoreItem } from '@/components/StoreList/StoreItem'
import { useSearch } from '@/queries/search'

export default function Search() {
  const { data: session } = useSession()
  const { user } = session ?? {}
  const setQuery = useSetAtom(searchQueryAtom)
  const setFilter = useSetAtom(storeFilterAtom)
  const { data } = useSearch()

  // When the page is entered, initialize the query
  useEffect(() => {
    setQuery(undefined)
  }, [setQuery])

  // Initialize the initial filter value
  useEffect(() => {
    if (!data) setFilter(initialFilter)
  }, [data, setFilter])

  return (
    <>
      <SearchBar userName={user?.name} />
      <StoreFilters />
      {!data?.length ? (
        <CategoryFilters cols={2} />
      ) : (
        <>
          {data?.map((store) => (
            <StoreItem key={store._id} store={store} />
          ))}
        </>
      )}
      <CartButton />
    </>
  )
}
