export interface Project {
    id: string;
    title: string;
    description: string;
    status: 'ongoing' | 'completed' | 'pending';
    createdAt: Date;
}

export interface ProjectInput {
    title: string;
    description: string;
    status: 'ongoing' | 'completed' | 'pending';
}