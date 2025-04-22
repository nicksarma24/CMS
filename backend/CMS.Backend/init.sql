CREATE TABLE IF NOT EXISTS Student(
   StudentId   INT PRIMARY KEY NOT NULL,
   FirstName CHAR(50) NOT NULL,
   LastName  CHAR(50) NOT NULL,
   Email CHAR(50) NOT NULL
);
 
 
INSERT OR IGNORE INTO Student (StudentId, FirstName, LastName, Email)
VALUES (1, 'John', 'Doe', 'john.doe@example.com' );
INSERT OR IGNORE INTO Student (StudentId, FirstName, LastName, Email)
VALUES (2, 'Jane', 'Smith', 'jane.smith@example.com' );