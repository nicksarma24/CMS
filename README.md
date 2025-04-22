# React, .NET & SQLite : School Management Application

## Objective

Build an React, .NET & SQLite-based Fullstack application for a school management system. The app is to be built as follows:

### Backend components:
Implement API that provides functionalities for the following operations on student data:

-  Adding new students.
-  Retrieving a list of all registered students.
-  Retrieving details of a specific student using their ID.
-  Deleting student records.

### Frontend components:
1. **AddStudent**: This component renders a form for adding new students. It includes:

- Two text input fields for capturing first name and last name.
- An email input field for student email addresses.
- A submit button to trigger the student creation process.

2. **StudentsData**: This component displays a table containing a list of registered students. It includes:

- A table with columns for first name, last name, and email address.
- Each student row has a "Delete" button in the "Actions" column. Clicking this button should initiate the student deletion process.

Please refer to the [BACKEND_README.md](backend/BACKEND_README.md) & [FRONTEND_README.md](frontend/FRONTEND_README.md) to find the detailed instructions of the respective project.

# Commands

> The `RUN` menu triggers the commands required for running the application and test cases inside the IDE. 

Please find below the details for the same:

## Backend:

### Init
```bash
cd $HOME/$NAME/backend && dotnet build
```
This command would run automatically when the IDE loads, however if there is some issue, you may have to run it manually.

### Start Server

```bash
cd $HOME/$NAME/backend && dotnet run --project StudentModel.WebAPI
```

This command will start the server.

- Once the server is started, navigate to the Thunder Client's tab ![Thunder client's tab](https://media-doselect.s3.amazonaws.com/generic/ryM78VN71g10k2dKr9K2wGYwo/ThunderClientLogo.png) and click on `New Request`.
- Test the API endpoints by sending specific requests to http://localhost:8002/{endpoints}. You can view the JSON response in the "Response" tab.

### Run TestCases

```bash
cd $HOME/$NAME/backend && dotnet test
```

This will run the test cases in the terminal.

## For Frontend:

### Init

```bash
cd $HOME/$NAME/frontend && npm install
```

This command runs automatically when the IDE loads; however, if there is an issue, you may have to run it manually.

### Start Server

```bash
cd $HOME/$NAME/frontend && npm start
```

This command will start the dev server. You can view the **Live Preview** once the server is started in multiple ways:

- Click the `Preview in Editor` option that pops up at the bottom-right corner
- Click the `Open Preview` option in the `Run` menu

### Run TestCases

```bash
cd $HOME/$NAME/frontend && npm test
```

This will run the frontend test cases in the terminal.

## SQLite > Launch CLI
```bash
cd $HOME/$NAME/backend/StudentModel.WebAPI && sqlite3 sqlite.db < init.sql && sqlite3 sqlite.db
```
This command runs automatically when the IDE loads; however, if there is an issue, you may have to run it manually.

## Reset

- Use this option to reset the workspace. 
- Please note that all your progress will be lost.

## Environment

- React Version: 18.2.0
- .NET version: 6.0
- Frontend Default Port: 3000
- Backend Default Port: 8002
