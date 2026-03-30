using EMS.Domain.Common;
using EMS.Domain.Enums;

namespace EMS.Domain.Entities;

public class Department : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ManagerName { get; set; } = string.Empty;
    public string ManagerEmail { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public DepartmentStatus Status { get; set; } = DepartmentStatus.Active;
}