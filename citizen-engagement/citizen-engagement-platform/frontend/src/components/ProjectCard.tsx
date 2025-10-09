import React from 'react';

interface Props {
  name: string;
  description: string;
  status: string;
}

const ProjectCard: React.FC<Props> = ({ name, description, status }) => (
  <div className="border rounded-lg p-4 shadow-sm bg-white mb-3">
    <h3 className="font-semibold text-lg">{name}</h3>
    <p className="text-gray-600">{description}</p>
    <span className={`inline-block mt-2 px-2 py-1 rounded text-sm ${status === 'active' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
      {status}
    </span>
  </div>
);

export default ProjectCard;
