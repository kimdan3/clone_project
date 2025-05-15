import { Menu } from '@/db/models/menu'
import express from 'express'

const router = express.Router()

/**
 * Get menu information
 *
 * @param menuId
 */
router.get('/:menuId', async (req, res) => {
  const { menuId } = req.params

  try {
    const menu = await Menu.findOne({ _id: menuId })
    res.status(200).json(menu)
  } catch (error) {
    console.error('Error occurred while fetching menu', error)
    res.sendStatus(500)
  }
})

/**
 * Get all menus for a specific store
 *
 * @param storeId - Store ID
 */
router.get('/store/:storeId', async (req, res) => {
  const { storeId } = req.params

  try {
    const menus = await Menu.find({ store: storeId })
    res.status(200).json(menus)
  } catch (error) {
    console.error('Error occurred while fetching store menus', error)
    res.sendStatus(500)
  }
})

export default router
