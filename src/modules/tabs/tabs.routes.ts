import { Router } from 'express'

const router = Router()
import {
  createTab,
  deleteTab,
  getAllTabs,
  getOneTab,
  updateTabs,
} from './tabs.controllers'

router.route('/').get(getAllTabs).post(createTab)
router.route('/:id').get(getOneTab).put(updateTabs).delete(deleteTab)

export default router
