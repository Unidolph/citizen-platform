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

---

## ✅ Summary of Enhancements
- Added **MongoDB message persistence** via `Message` model.
- Implemented **real-time chat** with Socket.IO + REST fallback.
- Added **role-based access control** with `isAdmin` middleware and frontend UI for admins.
- Full **TypeScript safety** on both ends.
- Ready for Docker Compose or cloud deployment.

---

Would you like me to **add file upload (image attachments for project issues)** and **email/push notifications** next?
