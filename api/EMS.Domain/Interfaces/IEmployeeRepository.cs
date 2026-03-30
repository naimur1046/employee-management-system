using EMS.Domain.Entities;

namespace EMS.Domain.Interfaces;

public interface IEmployeeRepository
{
    Task<IEnumerable<Employee>> GetAllAsync();
    Task<(IEnumerable<Employee> Items, int TotalCount)> GetPagedAsync(int pageNumber, int pageSize);
    Task<Employee?> GetByIdAsync(Guid id);
    Task<Employee> AddAsync(Employee employee);
    Task UpdateAsync(Employee employee);
    Task DeleteAsync(Guid id);
    Task<Employee?> GetByEmailAsync(string email);
}
