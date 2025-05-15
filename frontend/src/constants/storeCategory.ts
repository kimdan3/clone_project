export const StoreCategory = {
  KOREAN: 'KOREAN',
  JAPANESE: 'JAPANESE',
  CHINESE: 'CHINESE',
  CHICKEN: 'CHICKEN',
  PIZZA: 'PIZZA',
  ASIAN: 'ASIAN',
  MEXICAN: 'MEXICAN',
} as const

export type StoreCategory = typeof StoreCategory[keyof typeof StoreCategory]

export const StoreCategoryImages: Record<StoreCategory, string> = {
  KOREAN: '/imgs/bibimbap.jpeg',
  JAPANESE: '/imgs/sushi.jpeg',
  CHINESE: '/imgs/jjajang.jpeg',
  CHICKEN: '/imgs/chicken.jpeg',
  PIZZA: '/imgs/pizza.jpeg',
  ASIAN: '/imgs/pho.jpeg',
  MEXICAN: '/imgs/burrito.jpeg',
}
