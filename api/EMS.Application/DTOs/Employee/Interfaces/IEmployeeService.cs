using EMS.Application.Common;
using EMS.Application.DTOs.Employee;

namespace EMS.Application.Interfaces;

public interface IEmployeeService
{
    Task<IEnumerable<EmployeeResponseDto>> GetAllAsync();
    Task<EmployeePagedResponseDto> GetPagedAsync(int pageNumber, int pageSize);
    Task<EmployeeResponseDto> GetByIdAsync(Guid id);
    Task<EmployeeResponseDto> CreateAsync(CreateEmployeeDto dto);
    Task<EmployeeResponseDto> UpdateAsync(Guid id, UpdateEmployeeDto dto);
    Task DeleteAsync(Guid id);
}
