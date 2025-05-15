import { useEffect, useRef } from 'react'

import { useSetAtom } from 'jotai'

import { currentCategoryAtom } from '@/atoms/currentCategory'
import { getRecommendedMenus, getMenusInCategory } from '@/lib/menu'
import { Menu } from '@/types/menu'

import { MenuItem } from './MenuItem'

export function MenuInCategory({
  category,
  data,
}: {
  category: string
  data: Menu[]
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const setCurrentCategory = useSetAtom(currentCategoryAtom)

  const recommendedMenus = getRecommendedMenus(data)

  useEffect(() => {
    const options: IntersectionObserverInit = {
      rootMargin: '-42px 0px -90% 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentCategory(category)
        }
      })
    }, options)

    if (ref.current) observer.observe(ref.current)
  }, [category, setCurrentCategory])

  return (
    <div className="grid gap-4" ref={ref}>
      <div>
        <h2 id={category} className="text-xl">
          {category === 'Recommended Menu' ? 'Recommended' : category}
        </h2>
        <small className="text-gray-600">
          Menu photos are styled images and may differ from actual prepared food.
        </small>
      </div>
      {category === 'Recommended Menu' ? (
        <>
          {recommendedMenus.map((menu) => (
            <MenuItem menu={menu} key={`${menu.name}_RECOMMENDED`} />
          ))}
        </>
      ) : (
        <>
          {getMenusInCategory(data, category)?.map((menu) => (
            <MenuItem menu={menu} key={`${menu.name}_RECOMMENDED`} />
          ))}
        </>
      )}
    </div>
  )
}
