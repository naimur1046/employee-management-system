using EMS.Domain.Entities;
using EMS.Domain.Interfaces;
using EMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EMS.Infrastructure.Repositories;

public class DepartmentRepository : IDepartmentRepository
{
    private readonly ApplicationDbContext _context;

    public DepartmentRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Department>> GetAllAsync()
    {
        return await _context.Departments
            .Where(d => !d.IsDeleted)
            .ToListAsync();
    }

    public async Task<(IEnumerable<Department> Departments, int TotalCount)> GetPagedAsync(int pageNumber, int pageSize)
    {
        var query = _context.Departments.Where(d => !d.IsDeleted);
        var totalCount = await query.CountAsync();
        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

    public async Task<Department?> GetByIdAsync(Guid id)
    {
        return await _context.Departments
            .FirstOrDefaultAsync(d => d.Id == id && !d.IsDeleted);
    }

    public async Task<Department?> GetByCodeAsync(string code)
    {
        return await _context.Departments
            .FirstOrDefaultAsync(d => d.Code == code && !d.IsDeleted);
    }

    public async Task<Department> AddAsync(Department department)
    {
        await _context.Departments.AddAsync(department);
        await _context.SaveChangesAsync();
        return department;
    }

    public async Task UpdateAsync(Department department)
    {
        _context.Departments.Update(department);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var department = await _context.Departments.FindAsync(id);
        if (department != null)
        {
            department.IsDeleted = true;
            department.DeletedOnUtc = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }
}