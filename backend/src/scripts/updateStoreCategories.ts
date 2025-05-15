import { Store } from '../db/models/store'

const categoryMapping = {
  'KOREAN': 'KOREAN',
  'JAPANESE': 'JAPANESE',
  'CHINESE': 'CHINESE',
  'CHICKEN': 'CHICKEN',
  'PIZZA': 'PIZZA',
  'ASIAN': 'ASIAN',
  'MEXICAN': 'MEXICAN',
}

async function updateStoreCategories() {
  try {
    for (const [oldCategory, newCategory] of Object.entries(categoryMapping)) {
      await Store.updateMany(
        { category: oldCategory },
        { $set: { category: newCategory } }
      )
    }
    console.log('Store categories updated successfully')
  } catch (error) {
    console.error('Error updating store categories:', error)
  }
}

updateStoreCategories() 