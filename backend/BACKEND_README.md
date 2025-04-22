# .NET & SQLite : School Management Application

Implement a RESTful API for managing Student details. The system should:
- Save new Student details.
- Retrieve the list of all Students.
- Fetch the details of a specific Student by ID.
- Delete a Student by ID.

### Example Student JSON Object:
```json
[
  {
    "studentId": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  },
  {
    "studentId": 2,
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "smith.jane9@gmail.com"
  }
]
```

# Implementation Tasks

## REST API Endpoints in [StudentController](./StudentModel.WebAPI/Controllers/StudentController.cs)

Your task is to implement the following REST API endpoints:

| API Route                 | API Type | Success Response Code  | Error Response Code    |
|---------------------------|----------|------------------------|------------------------|
| /api/students             | POST     | 201                    | 400                    |
| /api/students             | GET      | 200                    | 404                    |
| /api/students/{studentId} | GET      | 200                    | 404                    |
| /api/students/{studentId} | DELETE   | 204                    | 404                    |

### a. Add a New Student (POST `/api/students`)
- **Description**: Save the details of a new Student object based on the provided information.
- **Request Body Example**:
  ```json
  {
    "FirstName": "David",
    "LastName": "Helms",
    "Email": "helms.david@example.com"
  }
  ```
- **Response**:
  - **Success (201 Created)**:
    ```json
    {
      "studentId": 3,
      "firstName": "David",
      "lastName": "Helms",
      "email": "helms.david@example.com"
    }
    ```
  - **Validation Error (400 Bad Request)**: Occurs if the request body is invalid.

### b. Retrieve All Students (GET `/api/students`)
- **Description**: Retrieve a list of all Students.
- **Response**:
  - **Success (200 OK)**:
    ```json
    [
      {
        "studentId": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com"
      },
      {
        "studentId": 2,
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "smith.jane9@gmail.com"
      }
    ]
    ```
  - **Not Found (404 Not Found)**: If no Students exist,with the message:
  ```
  No Student found
  ```

### c. Retrieve a Student by ID (GET `/api/students/{studentId}`)
- **Description**: Fetch the details of a Student based on their ID
- **Response**:
  - **Success (200 OK)**:
    ```json
    {
      "studentId": 2,
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "smith.jane9@gmail.com"
    }
    ```
  - **Not Found (404 Not Found)**: If the requested ID doesn't exist, with the message:
    ```
     No student with given id
    ```

### d. Delete a Student (DELETE `/api/students/{studentId}`)
- **Description**: Delete the Student with the specified ID.
- **Response**:
  - **Success (204 No Content)**
  - **Not Found (404 Not Found)**:
  ```
  No student with given id
  ```

## Provided Project Structure

### 1. [StudentModel.WebAPI](./StudentModel.WebAPI/)

#### a. **Models**
- [Student](./StudentModel.WebAPI/Models/Student.cs): 
Represents a Student entity with the following properties:
  - `StudentId` (int): Unique ID of the Student.
  - `FirstName` (string): Name of the Student.
  - `LastName` (String): Class of the Student.
  - `Email` (String): Student\u2019s Score.
- [StudentContext](./StudentModel.WebAPI/Models/StudentContext.cs): Represents the data context.

#### b. **Services**
- **[IStudentServices](./StudentModel.WebAPI/Services/IStudentServices.cs) Interface**: Defines methods for managing Students.
- **[StudentServices](./StudentModel.WebAPI/Services/StudentServices.cs) Implementation**: Contains business logic for the Student entity.

## Read-Only Files
- All files in `StudentModel.WebAPI` except `Controllers/StudentController.java`.
- All files in `StudentModel.Test/`.
- Environment-related files.

For more details, refer to:
- [Commands README.md](../README.md)
- [Frontend README.md](../frontend/FRONTEND_README.md)
