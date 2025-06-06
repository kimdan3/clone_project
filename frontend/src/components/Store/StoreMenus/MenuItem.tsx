import { useAtomValue, useSetAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiCartAdd } from 'react-icons/bi'

import {
  addMenuToCartAtom,
  cartAtom,
  removeMenuFromCartAtom,
} from '@/atoms/cart'
import { storeIdAtom } from '@/atoms/storeId'
import { MenuCounter } from '@/components/common/MenuCounter'
import { KRW } from '@/lib/currency'
import { useMenuInCart } from '@/lib/useMenuInCart'
import { Menu } from '@/types/menu'

export const MenuItem = ({ menu }: { menu: Menu }) => {
  const storeId = useAtomValue(storeIdAtom)
  const setCart = useSetAtom(cartAtom)
  const menusInCart = useMenuInCart(menu)
  const addMenuToCart = useSetAtom(addMenuToCartAtom)
  const removeMenuFromCart = useSetAtom(removeMenuFromCartAtom)

  const router = useRouter()

  const hasImages = !!menu.images?.length

  const addItemToCart = (menu: Menu) => {
    const result = addMenuToCart({ storeId, menu })
    if (!result) {
      const confirm = window.confirm(
        'You can only add items from the same store.\nIf you change the store, previously added items will be removed.'
      )
      if (confirm) {
        setCart({ storeId, menus: [{ menu, count: 1 }] })
      }
    }
  }

  const itemCount = menusInCart?.reduce((sum, menu) => sum + menu.count, 0)

  return (
    <div className="relative">
      <Link className="grid grid-cols-3" href={`/menu/${menu._id}`}>
        <div className={`${hasImages ? 'col-span-2' : 'col-span-3'}`}>
          <h3 className="text-lg font-bold">{menu.name}</h3>
          <h4 className="text-lg">{KRW(menu.price)}</h4>
          <p className="text-sm">{menu.description}</p>
        </div>
        {hasImages ? (
          <div className="col-span-1">
            <Image
              src={menu.images?.[0] || ''}
              width={100}
              height={100}
              className="object-cover"
              alt={menu.name}
            />
          </div>
        ) : null}
      </Link>
      <div className="absolute right-0 top-0 flex h-full items-center">
        {menusInCart && itemCount ? (
          <MenuCounter
            {...{
              removeMenuFromCart,
              cartMenu: menusInCart[0],
              itemCount,
              addMenuToCart,
              menu,
              storeId,
            }}
          />
        ) : (
          <button
            className="rounded-full border border-gray-200 bg-white p-1 text-lg text-blue-400 shadow-sm shadow-gray-500"
            onClick={(e) => {
              e.stopPropagation
              e.preventDefault
              if (menu.additionalSelections?.length) {
                router.push(`/menu/${menu._id}`)
                return
              }
              addItemToCart(menu)
            }}
          >
            <BiCartAdd />
          </button>
        )}
      </div>
    </div>
  )
}
