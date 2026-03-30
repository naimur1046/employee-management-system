using EMS.Domain.Entities;

namespace EMS.Domain.Interfaces;

public interface IDepartmentRepository
{
    Task<IEnumerable<Department>> GetAllAsync();
    Task<(IEnumerable<Department> Departments, int TotalCount)> GetPagedAsync(int pageNumber, int pageSize);
    Task<Department?> GetByIdAsync(Guid id);
    Task<Department?> GetByCodeAsync(string code);
    Task<Department> AddAsync(Department department);
    Task UpdateAsync(Department department);
    Task DeleteAsync(Guid id);
}