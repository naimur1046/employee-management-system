using EMS.Application.DTOs.Department;

namespace EMS.Application.Interfaces;

public interface IDepartmentService
{
    Task<IEnumerable<DepartmentResponseDto>> GetAllAsync();
    Task<DepartmentPagedResponseDto> GetPagedAsync(int pageNumber, int pageSize);
    Task<DepartmentResponseDto> GetByIdAsync(Guid id);
    Task<DepartmentResponseDto> CreateAsync(CreateDepartmentDto dto);
    Task<DepartmentResponseDto> UpdateAsync(Guid id, UpdateDepartmentDto dto);
    Task DeleteAsync(Guid id);
}