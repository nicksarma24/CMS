import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import AddStudent from './Components/AddStudent';
import StudentsData from './Components/StudentsData';

test('Check Add Student elements Present', () => {
  render(<AddStudent />);
  expect(screen.getByTestId("firstNameInput")).toBeTruthy();
  expect(screen.getByTestId("lastNameInput")).toBeTruthy();
  expect(screen.getByTestId("emailInput")).toBeTruthy();
  expect(screen.getByTestId("submitBtn")).toBeTruthy();
});

test('Check Add button', () => { 
  let dummyAddStudent = jest.fn();
  render(<AddStudent addStudent={dummyAddStudent}/>);

  fireEvent.change(screen.getByTestId("firstNameInput"), { target: { value: "A" } });
  fireEvent.change(screen.getByTestId("lastNameInput"), { target: { value: "B" } });
  fireEvent.change(screen.getByTestId("emailInput"), { target: { value: "a.b@c.com" } });

  fireEvent.click(screen.getByTestId("submitBtn"));

  expect(dummyAddStudent).toHaveBeenCalledTimes(1);
  expect(dummyAddStudent).toHaveBeenCalledWith({
    firstName: "A",
    lastName: "B",
    email: "a.b@c.com",
  });
});

test("StudentsData renders as expected", () => {
  let students = [
    {
      "_id": 1,
      "firstName": "Saurabh",
      "lastName": "Sharma",
      "email": "shramaSaurabh@gmail.com"
    },
    {
      "_id": 2,
      "firstName": "S",
      "lastName": "Sharma",
      "email": "ss@gmail.com"
    }
  ];
  
  render(<StudentsData students={students} />);

  const rows = screen.getByTestId("students-table").querySelectorAll("tr");

  expect(rows.length).toBe(2); 
  
  const firstRow = screen.getByTestId("data-row-1").children;
  expect(firstRow[1].textContent).toBe("Saurabh");
  expect(firstRow[2].textContent).toBe("Sharma");
  expect(firstRow[3].textContent).toBe("shramaSaurabh@gmail.com");
});

test('Check Delete button', () => { 
  let dummyDeleteStudent = jest.fn();
  let students = [
    {
      "_id": 1,
      "firstName": "Saurabh",
      "lastName": "Sharma",
      "email": "shramaSaurabh@gmail.com"
    },
    {
      "_id": 2,
      "firstName": "S",
      "lastName": "Sharma",
      "email": "ss@gmail.com"
    }
  ];
  
  render(<StudentsData students={students} deleteStudent={dummyDeleteStudent} />);
  
  fireEvent.click(screen.getByTestId("delete-1"));
  expect(dummyDeleteStudent).toHaveBeenCalledTimes(1);
  expect(dummyDeleteStudent).toHaveBeenCalledWith(1);

  fireEvent.click(screen.getByTestId("delete-2"));
  expect(dummyDeleteStudent).toHaveBeenCalledTimes(2);
  expect(dummyDeleteStudent).toHaveBeenCalledWith(2);
});
