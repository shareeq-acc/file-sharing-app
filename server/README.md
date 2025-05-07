# File Sharing Application - Server

This is the backend server for the File Sharing Application, built with NestJS. The server provides APIs for user authentication, file management, and storage integration with multiple cloud providers.

## Features

- User Authentication and Authorization
- File Upload and Management
- Multiple Storage Provider Support:
  - Google Drive Integration
  - Cloudinary Integration
  - Firebase Storage
- PostgreSQL Database Integration
- JWT-based Authentication
- Docker Support

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Docker (optional)
- Cloud Provider Accounts:
  - Google Cloud Platform
  - Cloudinary
  - Firebase

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Database Configuration
DB_TYPE=postgres
DB_HOST=db_host
DB_PORT=db_port
DB_NAME=db_name
DB_USER=your_user
DB_PASS=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google Drive Configuration
GOOGLE_DRIVE_FOLDER_ID=your_folder_id
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=your_redirect_uri
GOOGLE_REFRESH_TOKEN=your_refresh_token
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run start:dev
```

For production:
```bash
npm run build
npm run start:prod
```

## Docker Support

The application includes Docker support. To run with Docker:

1. Build the Docker image:
```bash
docker-compose build
```

2. Start the containers:
```bash
docker-compose up
```

## Project Structure

```
src/
├── auth/           # Authentication module
├── capsule/        # File capsule management
├── storage/        # Storage service integrations
├── user/           # User management
├── shared/         # Shared utilities and interfaces
├── app.module.ts   # Main application module
└── main.ts         # Application entry point
```

## API Endpoints

### Authentication
- POST /auth/register - Register new user
- POST /auth/login - User login
- GET /auth/google - Google OAuth login
- GET /auth/google/callback - Google OAuth callback

### User Management
- GET /user/profile - Get user profile
- PUT /user/profile - Update user profile

### File Management
- POST /capsule/upload - Upload file
- GET /capsule/files - List user's files
- GET /capsule/files/:id - Get file details
- DELETE /capsule/files/:id - Delete file

## Development

### Available Scripts

- `npm run start:dev` - Start development server with hot-reload
- `npm run build` - Build the application
- `npm run start:prod` - Start production server
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Lint the codebase
- `npm run format` - Format the codebase

## Testing

The application uses Jest for testing. Run tests with:

```bash
npm run test
```

For end-to-end testing:
```bash
npm run test:e2e
```

## Security

- JWT-based authentication
- Password hashing with bcrypt
- Environment variable configuration
- Input validation using class-validator

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
