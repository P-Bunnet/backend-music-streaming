import { Router, Response } from 'express'
import auth from '../../middleware/auth'
import songController from './song.controller'
import upload from '../../middleware/multer'
const router: Router = Router()

router.post('/', upload.single('song'), songController.postSong)
router.get('/', songController.getSongs)
router.get('/me', songController.getSongByUser)
router.get('/:id', songController.getSongById)
router.delete('/:id', songController.deleteSong)
router.get('/stream/:id', songController.streamSong)
export default router
