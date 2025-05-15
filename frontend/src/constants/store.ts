export const StoreSort = {
  RATING: 'RATING',
  REVIEW: 'REVIEW',
  DELIVERY: 'DELIVERY',
} as const

export type StoreSort = (typeof StoreSort)[keyof typeof StoreSort]

export const SortText = {
  [StoreSort.RATING]: 'Highest Rating',
  [StoreSort.REVIEW]: 'Most Reviews',
  [StoreSort.DELIVERY]: 'Lowest Delivery Fee',
}

export type SortText = (typeof SortText)[keyof typeof SortText]

export const DeliveryOption = [
  [0, 'Free Delivery'],
  [1000, 'Under 1,000 won'],
  [2000, 'Under 2,000 won'],
  [3000, 'Under 3,000 won'],
  ['ALL', 'All'],
] as const

export type DeliveryPrice = (typeof DeliveryOption)[number][0]
export type DeliveryText = (typeof DeliveryOption)[number][1]

export const OrderPriceOption = [
  [5000, 'Under 5,000 won'],
  [10000, 'Under 10,000 won'],
  [12000, 'Under 12,000 won'],
  [15000, 'Under 15,000 won'],
  ['ALL', 'All'],
] as const

export type OrderPrice = (typeof OrderPriceOption)[number][0]
export type OrderText = (typeof OrderPriceOption)[number][1]
