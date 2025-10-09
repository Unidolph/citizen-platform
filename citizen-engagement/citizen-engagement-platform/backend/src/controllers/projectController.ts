class ProjectController {
    private projects: any[] = []; // This will hold the project data temporarily

    public getProjects(req: any, res: any): void {
        res.status(200).json(this.projects);
    }

    public createProject(req: any, res: any): void {
        const newProject = req.body;
        this.projects.push(newProject);
        res.status(201).json(newProject);
    }

    public updateProject(req: any, res: any): void {
        const { id } = req.params;
        const updatedProject = req.body;
        const index = this.projects.findIndex(project => project.id === id);

        if (index !== -1) {
            this.projects[index] = { ...this.projects[index], ...updatedProject };
            res.status(200).json(this.projects[index]);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    }

    public deleteProject(req: any, res: any): void {
        const { id } = req.params;
        const index = this.projects.findIndex(project => project.id === id);

        if (index !== -1) {
            this.projects.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    }
}

export default new ProjectController();