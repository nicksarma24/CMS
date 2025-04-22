using CMS.Backend.Data;
using CMS.Backend.Helpers;
using CMS.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly JwtHelper _jwtHelper;

    public AuthController(AppDbContext context, JwtHelper jwtHelper)
    {
        _context = context;
        _jwtHelper = jwtHelper;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserDto userDto)
    {
        var allowedRoles = new[] { "Creator", "Editor", "Reader" };

        if (!allowedRoles.Contains(userDto.Role))
            return BadRequest(new { message = "Invalid role. Must be Creator, Editor, or Reader." });

        if (await _context.Users.AnyAsync(u => u.Username == userDto.Username))
            return BadRequest(new { message = "Username already exists." });

        var hashed = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
        var user = new User
        {
            Username = userDto.Username,
            PasswordHash = hashed,
            Role = userDto.Role
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "User registered successfully." });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserDto userDto)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == userDto.Username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash))
            return Unauthorized(new { message = "Invalid credentials" });

        var token = _jwtHelper.GenerateToken(user);
        return Ok(new { token, role = user.Role });
    }

    public class UserDto
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = "Creator"; // Default if not specified
    }
}
