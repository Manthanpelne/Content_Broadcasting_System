# Content Broadcasting System
A secure, role-based backend system for managing and broadcasting educational content. Built with the MERN stack (Node.js, Express, Prisma, PostgreSQL).

## Features
- **Secure Authentication**: JWT-based login/signup with password hashing (bcrypt).
- **Role-Based Access Control (RBAC)**: Strict separation between `TEACHER` (uploaders) and `PRINCIPAL` (approvers).
- **Content Lifecycle**: Workflow managing content from `PENDING` to `APPROVED` or `REJECTED`.
- **Media Handling**: Secure file uploads using `multer` with MIME-type filtering.
- **Dynamic Broadcasting**: Time-sensitive public API that serves scheduled content based on current status and time windows.
- **Cross-Platform Compatibility**: Path normalization ensures consistent file URLs across Windows and Linux environments.

## Tech Stack
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT, bcrypt
- **File Storage**: Local filesystem (Multer)

## API Documentation

### Authentication
- `POST /auth/signup` - Register a new user (`role`: TEACHER/PRINCIPAL)
- `POST /auth/login` - Authenticate and receive JWT

### Content Management
- `POST /content/upload` - Upload content (requires `TEACHER` role)
- `PATCH /content/:id/status` - Update approval status (requires `PRINCIPAL` role)

### Public API
- `GET /content/live/:teacherId` - Fetch active, approved content within scheduled time windows.

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Manthanpelne/Content_Broadcasting_System.git

   ### .env :
- `JWT_SECRET` - *****
- `DATABASE_URL` - *****

2. **Installation**:
    a. npm install
    b. npm run dev

**for prisma ORM visualization** : enter ->  npx prisma studio  in terminal
   
