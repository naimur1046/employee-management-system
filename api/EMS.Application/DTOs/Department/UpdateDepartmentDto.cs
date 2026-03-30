using EMS.Domain.Enums;

namespace EMS.Application.DTOs.Department;

public class UpdateDepartmentDto
{
    public required string Name { get; set; }
    public required string Code { get; set; }
    public string? Description { get; set; }
    public string? ManagerName { get; set; }
    public string? ManagerEmail { get; set; }
    public string? Location { get; set; }
    public DepartmentStatus Status { get; set; }
}