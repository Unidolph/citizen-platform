# Citizen Engagement Platform

This project is a citizen engagement platform designed to follow up on government projects. It allows users to view, create, update, and delete information related to various government initiatives. The application is built using the MERN stack, leveraging MongoDB for the database, Express.js for the backend, React.js for the frontend, and Node.js as the runtime environment.

## Project Structure

The project is organized into two main parts: the backend and the frontend.

### Backend

- **`backend/src/app.ts`**: Entry point of the backend application. Initializes the Express app, sets up middleware, and connects to the MongoDB database.
- **`backend/src/controllers/projectController.ts`**: Contains the `ProjectController` class with methods for handling CRUD operations for government projects.
- **`backend/src/models/project.ts`**: Defines the Mongoose model for government projects, including properties like title, description, status, and createdAt.
- **`backend/src/routes/projectRoutes.ts`**: Sets up the routes for project-related endpoints using the `ProjectController`.
- **`backend/src/types/index.ts`**: Exports interfaces that define the structure of project data used in the application.
- **`backend/package.json`**: Configuration file for the backend, listing dependencies and scripts.
- **`backend/tsconfig.json`**: TypeScript configuration file for the backend.
- **`backend/README.md`**: Documentation for the backend part of the project.

### Frontend

- **`frontend/src/App.tsx`**: Main component of the React application, setting up routing and rendering the main layout.
- **`frontend/src/components/ProjectList.tsx`**: Functional component that fetches and displays a list of government projects from the backend.
- **`frontend/src/pages/Home.tsx`**: Landing page component that includes the `ProjectList`.
- **`frontend/src/types/index.ts`**: Exports interfaces that define the structure of project data received from the backend.
- **`frontend/package.json`**: Configuration file for the frontend, listing dependencies and scripts.
- **`frontend/tsconfig.json`**: TypeScript configuration file for the frontend.
- **`frontend/README.md`**: Documentation for the frontend part of the project.

## Getting Started

1. Clone the repository to your local machine.
2. Navigate to the `backend` directory and install the dependencies:
   ```
   npm install
   ```
3. Set up your MongoDB database (either locally or using MongoDB Atlas).
4. Start the backend server:
   ```
   npm start
   ```
5. Navigate to the `frontend` directory and install the dependencies:
   ```
   npm install
   ```
6. Start the frontend application:
   ```
   npm start
   ```

## Features

- View a list of government projects.
- Create new projects with relevant details.
- Update existing project information.
- Delete projects that are no longer relevant.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

# Citizen Engagement Platform — Full MERN + TypeScript Implementation

This version now includes:
1. **Persistent chat storage** (messages saved in MongoDB)
2. **Admin role UI and permissions** (frontend + backend)
3. **Complete TypeScript integration** across backend and frontend.

---

## 🧱 Backend (Express + TypeScript)

### 📦 Install dependencies
```bash
cd backend
pnpm add express mongoose dotenv cors bcryptjs jsonwebtoken socket.io
pnpm add -D typescript ts-node-dev @types/node @types/express @types/cors @types/bcryptjs @types/jsonwebtoken @types/socket.io
```

### 🗂 Folder structure
```
backend/
├─ src/
│  ├─ index.ts
│  ├─ app.ts
│  ├─ socket.ts
│  ├─ config/db.ts
│  ├─ models/
│  │  ├─ User.ts
│  │  ├─ Project.ts
│  │  └─ Message.ts
│  ├─ routes/
│  │  ├─ auth.ts
│  │  ├─ projects.ts
│  │  └─ chat.ts
│  ├─ controllers/
│  │  ├─ authController.ts
│  │  ├─ projectController.ts
│  │  └─ chatController.ts
│  └─ middleware/auth.ts
```

### 🧩 New Model — `Message.ts`
```ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  receiver?: mongoose.Types.ObjectId;
  content: string;
  timestamp: Date;
  room: string;
}

const MessageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  room: { type: String, required: true },
});

export default mongoose.model<IMessage>('Message', MessageSchema);
```

### 💬 Chat Controller — `chatController.ts`
```ts
import { Request, Response } from 'express';
import Message from '../models/Message';

export const getMessagesByRoom = async (req: Request, res: Response) => {
  try {
    const { room } = req.params;
    const messages = await Message.find({ room }).populate('sender', 'fullName role');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const saveMessage = async (sender: string, content: string, room: string) => {
  const message = new Message({ sender, content, room });
  await message.save();
  return message;
};
```

### 💬 Socket Handler — `socket.ts`
```ts
import { Server, Socket } from 'socket.io';
import { saveMessage } from './controllers/chatController';

export const initSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('New connection:', socket.id);

    socket.on('join_room', (room: string) => {
      socket.join(room);
    });

    socket.on('send_message', async (data: { sender: string; content: string; room: string }) => {
      const saved = await saveMessage(data.sender, data.content, data.room);
      io.to(data.room).emit('receive_message', saved);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected:', socket.id);
    });
  });
};
```

### 🧑‍💼 User Model — `User.ts` (with roles)
```ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: 'citizen' | 'admin';
}

const UserSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['citizen', 'admin'], default: 'citizen' },
});

export default mongoose.model<IUser>('User', UserSchema);
```

### 🧠 Auth Middleware — `auth.ts`
```ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin only' });
  }
  next();
};
```

---

## 🎨 Frontend (React + TypeScript + Tailwind)

### 📦 Install dependencies
```bash
cd citizen-frontend
pnpm create vite@latest . --template react-ts
pnpm add axios socket.io-client react-router-dom
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 🗂 Folder structure
```
citizen-frontend/
├─ src/
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ services/api.ts
│  ├─ components/
│  │  ├─ ChatBox.tsx
│  │  ├─ AdminDashboard.tsx
│  │  └─ ProjectList.tsx
│  ├─ pages/
│  │  ├─ Login.tsx
│  │  ├─ Register.tsx
│  │  └─ Dashboard.tsx
│  └─ context/AuthContext.tsx
```

### 🔐 Role-based Access Example
```tsx
// src/components/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      const res = await api.get('/projects', { headers: { Authorization: `Bearer ${token}` } });
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Project Management</h2>
      {projects.map((p: any) => (
        <div key={p._id} className="bg-gray-100 p-4 rounded-lg mb-3">
          <p><strong>{p.name}</strong> — Status: {p.status}</p>
          <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Update</button>
        </div>
      ))}
    </div>
  );
};
export default AdminDashboard;
```

### 💬 Chat Component (Persistent Messages)
```tsx
// src/components/ChatBox.tsx
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../services/api';

const socket = io(import.meta.env.VITE_SOCKET_URL);

const ChatBox: React.FC<{ room: string }> = ({ room }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    socket.emit('join_room', room);

    api.get(`/chat/${room}`).then(res => setMessages(res.data));

    socket.on('receive_message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [room]);

  const sendMessage = () => {
    socket.emit('send_message', { sender: user._id, content: message, room });
    setMessage('');
  };

  return (
    <div className="p-4 border rounded-md">
      <h3 className="font-semibold mb-2">Chat Room: {room}</h3>
      <div className="h-64 overflow-y-scroll mb-3 bg-gray-100 p-2 rounded">
        {messages.map((m, i) => (
          <div key={i} className="mb-1">
            <strong>{m.sender.fullName || 'Anonymous'}:</strong> {m.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  );
};
export default ChatBox;
```

---

## ✅ Summary of Enhancements
- Added **MongoDB message persistence** via `Message` model.
- Implemented **real-time chat** with Socket.IO + REST fallback.
- Added **role-based access control** with `isAdmin` middleware and frontend UI for admins.
- Full **TypeScript safety** on both ends.
- Ready for Docker Compose or cloud deployment.

---

Would you like me to **add file upload (image attachments for project issues)** and **email/push notifications** next?
