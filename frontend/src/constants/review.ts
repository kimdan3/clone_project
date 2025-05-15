export const ReviewSort = {
  RECENT: 'RECENT',
  RATING_DESC: 'RATING_DESC',
  RATING_ASC: 'RATING_ASC',
} as const

export type ReviewSort = (typeof ReviewSort)[keyof typeof ReviewSort]

export const ReviewSortText = {
  [ReviewSort.RECENT]: 'Latest',
  [ReviewSort.RATING_DESC]: 'Highest Rating',
  [ReviewSort.RATING_ASC]: 'Lowest Rating',
} as const

export type ReviewSortText =
  (typeof ReviewSortText)[keyof typeof ReviewSortText]
