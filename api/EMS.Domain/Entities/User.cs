using EMS.Domain.Common;
using EMS.Domain.Enums;

namespace EMS.Domain.Entities;

public class User : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string? MobileNumber { get; set; }
    public UserRole Role { get; set; } = UserRole.User;
}
