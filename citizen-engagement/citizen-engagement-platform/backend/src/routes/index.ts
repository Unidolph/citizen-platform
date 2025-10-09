import { Router } from 'express'
import auth from './authRoutes'
import projects from './projectRoutes'
import chat from './chatRoutes'


const router = Router()
router.use('/auth', auth)
router.use('/projects', projects)
router.use('/chat', chat)


export default router