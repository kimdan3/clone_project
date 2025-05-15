import { atom } from 'jotai'

export const currentCategoryAtom = atom<string>('Recommended')
currentCategoryAtom.debugLabel = 'currentCategoryAtom'
