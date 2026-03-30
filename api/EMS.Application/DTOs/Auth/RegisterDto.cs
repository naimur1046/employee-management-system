using EMS.Domain.Enums;

namespace EMS.Application.DTOs.Auth;

public class RegisterDto
{
    public required string Email { get; set; }
    public required string Password { get; set; } 
    public required string Name { get; set; }
    public string? MobileNumber { get; set; }
    public UserRole Role { get; set; } = UserRole.User;
}