using FluentAssertions;
using StudentModel.WebAPI.Controllers;
using StudentModel.WebAPI.Models;
using StudentModel.WebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
 
namespace StudentModel.Test
{
    public class UnitTest1
    {
 
        [Fact]
        public async Task GetAllStudent_ShouldReturn200Status()
        {
            var StudentService = new Mock<IStudentServices>();
            StudentService.Setup(_ => _.GetAllStudents()).ReturnsAsync(GetStudentData());
            var GetStudent = new StudentController(StudentService.Object);
 
            var result = (OkObjectResult)await GetStudent.GetStudents();
 
            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public async Task GetAllStudent_ShouldReturn404Status()
        {
            var StudentService = new Mock<IStudentServices>();
            StudentService.Setup(_ => _.GetAllStudents()).ReturnsAsync(GetStudentData2());
            var GetStudent = new StudentController(StudentService.Object);
 
            var result = (NotFoundObjectResult)await GetStudent.GetStudents();
 
            result.StatusCode.Should().Be(404);
        }
 
        [Fact]
        public async Task GetStudentById_ShouldReturn200Status()
        {
            var StudentService = new Mock<IStudentServices>();
            var StudentList = GetStudentData();
            StudentService.Setup(_ => _.GetStudentById(3)).ReturnsAsync(StudentList[2]);
            var GetStudent = new StudentController(StudentService.Object);

            var result = (OkObjectResult)await GetStudent.GetStudentById(3);

            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public async Task GetStudentById_ShouldReturn404Status()
        {
            var StudentService = new Mock<IStudentServices>();
            var StudentList = GetStudentData();
            StudentService.Setup(_ => _.GetStudentById(5));
            var GetStudent = new StudentController(StudentService.Object);

            var result = (NotFoundObjectResult)await GetStudent.GetStudentById(5);

            result.StatusCode.Should().Be(404);
        }

        [Fact]
        public async Task AddStudents_ValidStudent_ReturnsCreated()
        {
            // Arrange
            var Student = new Student
            {
                StudentId = 1,
                FirstName =  "Alice",
                LastName = "Johnson",
                Email = "alice.johnson@example.com"
            };

            var StudentServiceMock = new Mock<IStudentServices>();
            StudentServiceMock.Setup(x => x.AddNewStudent(It.IsAny<Student>())).Returns(Task.CompletedTask);

            var controller = new StudentController(StudentServiceMock.Object);

            // Act
            var result = await controller.AddStudents(Student);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var model = Assert.IsType<Student>(createdAtActionResult.Value);
            Assert.Equal(Student.StudentId, model.StudentId);
        }

         [Fact]
        public async Task AddStudents_InvalidStudent_ReturnsBadRequest()
        {
            // Arrange
            var Student = new Student(); // Invalid Student without required fields

            var StudentServiceMock = new Mock<IStudentServices>();

            var controller = new StudentController(StudentServiceMock.Object);
            controller.ModelState.AddModelError("FirstName", "The First Name field is required.");

            // Act
            var result = await controller.AddStudents(Student);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task DeleteStudentById_ShouldReturn200Status(){

            var StudentService = new Mock<IStudentServices>();
            var StudentList = GetStudentData();
            StudentService.Setup(_ => _.DeleteStudentById(StudentList[2].StudentId)).ReturnsAsync(true);
            var GetStudent = new StudentController(StudentService.Object);

            var result = (NoContentResult)await GetStudent.Delete(3);

            result.StatusCode.Should().Be(204);
        }

        [Fact]
        public async Task DeleteStudentById_ShouldReturn404Status(){

            var StudentService = new Mock<IStudentServices>();
            var StudentList = GetStudentData();
            StudentService.Setup(_ => _.DeleteStudentById(StudentList[2].StudentId)).ReturnsAsync(true);
            var GetStudent = new StudentController(StudentService.Object);

            var result = (NotFoundObjectResult)await GetStudent.Delete(5);

            result.StatusCode.Should().Be(404);
        }


        private List<Student> GetStudentData()
        {
            List<Student> Student = new List<Student>
            {
                new Student {
                    StudentId = 1,
                    FirstName =  "Bob",
                    LastName = "Williams",
                    Email = "bob.williams@example.com"
                },
                new Student {
                    StudentId = 2,
                    FirstName =  "Emily",
                    LastName = "Brown",
                    Email = "emily.williams@example.com"
                },
                new Student {
                    StudentId = 3,
                    FirstName =  "David",
                    LastName = "Browns",
                    Email = "bob.williams@example.com"
                }
 
            };
            return Student;
 
        }

        private List<Student> GetStudentData2()
        {
            List<Student> Student = new List<Student>();
            return Student;

        }
    }
}