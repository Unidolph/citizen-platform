# Citizen Engagement Platform Backend

This document provides an overview of the backend part of the Citizen Engagement Platform project, which is designed to follow up on government projects.

## Project Structure

The backend is structured as follows:

```
backend/
├── src/
│   ├── app.ts
│   ├── config/
│   │   └── db.ts
│   ├── models/
│   │   ├── Project.ts
│   │   └── User.ts
│   ├── controllers/
│   │   ├── projectController.ts
│   │   └── authController.ts
│   ├── routes/
│   │   ├── projectRoutes.ts
│   │   └── authRoutes.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   ├── utils/
│   │   └── generateToken.ts
│   └── types/
│       └── express.d.ts
├── .env
├── package.json
├── tsconfig.json
              # This file
```

## Setup Instructions

1. **Clone the repository** to your local machine.
2. **Navigate to the backend directory**:
   ```
   cd citizen-engagement-platform/backend
   ```
3. **Install dependencies**:
   ```
   pnpm install
   ```
4. **Set up your MongoDB database** (either local or using MongoDB Atlas).
5. **Run the application**:
   ```
   pnpm run dev
   ```

## API Usage

The backend exposes several endpoints for managing government projects. The main routes are defined in `projectRoutes.ts` and handled by the `ProjectController`.

### Endpoints

- `GET /projects`: Retrieve a list of all projects.
- `POST /projects`: Create a new project.
- `PUT /projects/:id`: Update an existing project.
- `DELETE /projects/:id`: Delete a project.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing project data.
- **Mongoose**: ODM for MongoDB to define models and interact with the database.
- **TypeScript**: Superset of JavaScript for type safety and better development experience.

## Contribution

Feel free to contribute to this project by submitting issues or pull requests. Your feedback and contributions are welcome!

## License

This project is licensed under the MIT License. See the LICENSE file for more details.