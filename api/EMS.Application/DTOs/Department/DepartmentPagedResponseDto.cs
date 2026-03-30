namespace EMS.Application.DTOs.Department;

public class DepartmentPagedResponseDto
{
    public IEnumerable<DepartmentResponseDto> Departments { get; set; } = new List<DepartmentResponseDto>();
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
    public bool HasPreviousPage { get; set; }
    public bool HasNextPage { get; set; }
}