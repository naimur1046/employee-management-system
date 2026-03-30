using EMS.Domain.Enums;

namespace EMS.Application.DTOs.Auth;

public class AuthResponseDto
{
    public required string Token { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public Guid Id { get; set; }
    public string? MobileNumber { get; set; }
    public UserRole Role { get; set; }
}