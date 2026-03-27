using EMS.Application.DTOs.Employee;

namespace EMS.Application.DTOs.Employee;

public class EmployeePagedResponseDto
{
    public IEnumerable<EmployeeResponseDto> Employees { get; set; } = new List<EmployeeResponseDto>();
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
    public int TotalCount { get; set; }
    public bool HasPreviousPage { get; set; }
    public bool HasNextPage { get; set; }
}
