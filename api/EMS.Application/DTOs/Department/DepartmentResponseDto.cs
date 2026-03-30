using EMS.Domain.Enums;

namespace EMS.Application.DTOs.Department;

public class DepartmentResponseDto
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Code { get; set; }
    public string? Description { get; set; }
    public string? ManagerName { get; set; }
    public string? ManagerEmail { get; set; }
    public int EmployeeCount { get; set; }
    public string? Location { get; set; }
    public DepartmentStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}