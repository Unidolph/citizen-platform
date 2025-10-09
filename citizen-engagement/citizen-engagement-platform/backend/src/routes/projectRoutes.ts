import { Router } from 'express';
import projectController  from '../controllers/projectController';
import { protect } from "../middleware/authMiddleware";

const router = Router();
export function setRoutes(app: Router) {
    router.get('/', projectController.getProjects.bind(projectController));
    router.post('/', projectController.createProject.bind(projectController));
    router.put('/:id', projectController.updateProject.bind(projectController));
    router.delete('/:id', projectController.deleteProject.bind(projectController));
}

export default setRoutes;