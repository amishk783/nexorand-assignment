# nexorand-assignment

## Features

- API for fetching, creating, updating, and deleting student records.
- Centralized error handling with structured error objects (`AppError`).
- Logging with **Winston** for detailed error tracking.
- API documentation with **Swagger** (optional, if integrated).

## Setup Instructions

### Prerequisites

- Node.js (version 14 or later)
- NPM or Yarn (for package management)

### 1. Clone the Repository

```bash

git clone https://github.com/your-username/your-project-name.git
cd your-project-name

# OR
yarn install
```

### 2. Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
# OR
yarn install
```

### 3. Environment Variables

Create a .env file in the root directory and add your environment-specific variables (e.g., database configuration, API keys). Example:

```bash
env

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=studentdb
```

### 4. Running the Application

After setting up the environment variables, you can start the application in development mode using:

```bash

npm run dev
# OR
yarn dev
```

This will start the server on http://localhost:5000 (or the port defined in your .env file).

### 5. Running the Application in Production Mode

For production, you can build and start the app:

```bash

npm run build
npm start
# OR
yarn build
yarn start
```

## API Endpoints

### 1. Get All Students

- **Endpoint:** `GET /api/students`
- **Description:** Fetches a list of all students.
- **Response:**

````json
[
{
"id": 1,
"name": "John Doe",
"age": 21,
"email": "john.doe@example.com"
},
...
]
## 2. Get a Single Student

**Endpoint:** `GET /api/students/:id`

**Description:** Fetches a student by ID.

**URL Parameters:**
- `id` (required): The ID of the student.

**Response:**
```json
{
    "id": 1,
    "name": "John Doe",
    "age": 21,
    "email": "john.doe@example.com"
}

3. Create a New Student
Endpoint: POST /api/students
Description: Creates a new student.
Request Body:
json

{
"name": "Jane Smith",
"age": 22,
"email": "jane.smith@example.com"
}
Response:
json

{
"id": 2,
"name": "Jane Smith",
"age": 22,
"email": "jane.smith@example.com"
} 4. Update a Student
Endpoint: PUT /api/students/:id
Description: Updates an existing student's information.
URL Parameters:
id (required): The ID of the student.
Request Body:
json

{
"name": "Jane Doe",
"age": 23,
"email": "jane.doe@example.com"
}
Response:
json

{
"id": 2,
"name": "Jane Doe",
"age": 23,
"email": "jane.doe@example.com"
} 5. Delete a Student
Endpoint: DELETE /api/students/:id
Description: Deletes a student by ID.
URL Parameters:
id (required): The ID of the student.
Response:
json

{
"message": "Student deleted successfully"
}
Error Handling
Custom Error Class (AppError)
The app uses a custom AppError class to handle errors in a structured way. This allows for consistent error responses and logging.

Example Error Response:
json

{
"status": "error",
"message": "Resource not found",
"statusCode": 404
}
## Logging Errors
The app uses Winston for logging errors. All errors are logged with detailed information, including the stack trace, for easy debugging.

Example Log Output:
vbnet

[2024-11-22T10:20:15.123Z] error: Error in getAllStudent: Error: Database connection failed
at /path/to/your/file.js:45:12
at async /path/to/your/file.js:50:18
Common Errors:
400 Bad Request: When the request body is missing required fields or is malformed.
404 Not Found: When the resource (e.g., student) is not found.
500 Internal Server Error: For unexpected server errors, such as database issues.

````

```

```
