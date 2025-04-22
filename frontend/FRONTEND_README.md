# School Management System Frontend (React)

This document outlines the functionalities and implementation aspects of the frontend application for the school management system, built using React.js.

## User Interface Components

The frontend consists of the following primary components:

### [AddStudent](src/Components/AddStudent.js)

This component renders a form for adding new students. It includes:

- **Two text input fields** for capturing first name and last name.
- **An email input field** for student email address.
- **A submit button** to trigger the student creation process.

### [StudentsData](src/Components/StudentsData.js)

This component displays a table containing a list of registered students. It includes:

- **A table with columns** for first name, last name, and email address.
- **A "Delete" button** in the "Actions" column for each student row. Clicking this button should initiate the student deletion process.

## Implementation Tasks

The following tasks need to be completed in the respective code files:

### [AddStudent.js](src/Components/AddStudent.js)

- Implement the form logic to **capture user input** for first name, last name, and email.
- Complete the necessary functions to **handle form submission** and pass the student data to the `App.js` component.

### [StudentsData](src/Components/StudentsData.js)

- **Render the student data** in a table format by iterating through the students array received as props.
- Implement the **delete functionality** for each student row. Clicking the "Delete" button should trigger a function call to the `App.js` component, passing the specific student's ID.

### [App.js](src/App.js)

- Implement logic to **interact with the backend API** using the fetch API or a third-party library like Axios.
- **Handle GET requests** to retrieve all students upon application load.
- **Handle POST requests** to create new students upon form submission in `AddStudent.js`. Pass the collected student data in the request body.
- **Handle DELETE requests** to remove students upon clicking the "Delete" button in `StudentsData.js`. Pass the specific student's ID in the URL path.
- **Update the component state** with the fetched or updated student data for rendering in the respective components.
- Pass the student data and required functions as props to the **AddStudent and StudentsData** components.
- Make all the request to `{apiUrl}endpoint`, **apiURL** is imported as variable and **endpoint** would be the respective endpoint for the request.


## Testing Considerations

The components utilize `data-testid` attributes to facilitate testing:

### AddStudent

- `firstNameInput`: **First name input field.**
- `lastNameInput`: **Last name input field.**
- `emailInput`: **Email input field.**
- `submitBtn`: **Submit button.**

### StudentsData

- `students-table`: **Table body containing student data.**
- `data-row-{studentId}`: **Each data row in the table** (dynamic based on student ID).
- `delete-{studentId}`: **Delete button for each student row** (dynamic based on student ID).

Ensure your implementation aligns with these attributes for successful test execution.

## Expected Live Preview

![Live Preview (Placeholder)](https://media-doselect.s3.amazonaws.com/generic/5wQvvg80xvWBaOKxM3jaQvXgd/SMS.gif)

For more details, refer to:
- [Commands README.md](../README.md)
- [Backend README.md](../backend/BACKEND_README.md)