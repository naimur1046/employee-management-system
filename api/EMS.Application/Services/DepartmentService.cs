using EMS.Application.DTOs.Department;
using EMS.Application.Interfaces;
using EMS.Domain.Entities;
using EMS.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace EMS.Application.Services;

public class DepartmentService : IDepartmentService
{
    private readonly IDepartmentRepository _departmentRepository;
    private readonly IEmployeeRepository _employeeRepository;
    private readonly ILogger<DepartmentService> _logger;

    public DepartmentService(
        IDepartmentRepository departmentRepository,
        IEmployeeRepository employeeRepository,
        ILogger<DepartmentService> logger)
    {
        _departmentRepository = departmentRepository;
        _employeeRepository = employeeRepository;
        _logger = logger;
    }

    public async Task<IEnumerable<DepartmentResponseDto>> GetAllAsync()
    {
        _logger.LogInformation("Fetching all departments.");
        var departments = await _departmentRepository.GetAllAsync();
        var allEmployees = await _employeeRepository.GetAllAsync();

        return departments.Select(d => MapToResponseDto(d, allEmployees.Count(e => e.Department == d.Name)));
    }

    public async Task<DepartmentPagedResponseDto> GetPagedAsync(int pageNumber, int pageSize)
    {
        _logger.LogInformation("Fetching paged departments. Page: {PageNumber}, Size: {PageSize}", pageNumber, pageSize);
        var (departments, totalCount) = await _departmentRepository.GetPagedAsync(pageNumber, pageSize);
        var allEmployees = await _employeeRepository.GetAllAsync();

        var departmentDtos = departments.Select(d => MapToResponseDto(d, allEmployees.Count(e => e.Department == d.Name)));
        var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

        return new DepartmentPagedResponseDto
        {
            Departments = departmentDtos,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalPages = totalPages,
            HasPreviousPage = pageNumber > 1,
            HasNextPage = pageNumber < totalPages
        };
    }

    public async Task<DepartmentResponseDto> GetByIdAsync(Guid id)
    {
        _logger.LogInformation("Fetching department by Id: {Id}", id);
        var department = await _departmentRepository.GetByIdAsync(id);
        if (department == null)
        {
            _logger.LogWarning("Department with Id: {Id} not found.", id);
            throw new Exception("Department not found.");
        }

        var allEmployees = await _employeeRepository.GetAllAsync();
        return MapToResponseDto(department, allEmployees.Count(e => e.Department == department.Name));
    }

    public async Task<DepartmentResponseDto> CreateAsync(CreateDepartmentDto dto)
    {
        _logger.LogInformation("Attempting to create department with code: {Code}", dto.Code);
        var existingDepartment = await _departmentRepository.GetByCodeAsync(dto.Code);
        if (existingDepartment != null)
        {
            _logger.LogWarning("Create department failed: Department with code {Code} already exists.", dto.Code);
            throw new Exception("Department with this code already exists.");
        }

        var department = new Department
        {
            Name = dto.Name,
            Code = dto.Code,
            Description = dto.Description ?? string.Empty,
            ManagerName = dto.ManagerName ?? string.Empty,
            ManagerEmail = dto.ManagerEmail ?? string.Empty,
            Location = dto.Location ?? string.Empty,
            Status = dto.Status
        };

        var createdDepartment = await _departmentRepository.AddAsync(department);
        _logger.LogInformation("Department with Id: {Id} created successfully.", createdDepartment.Id);

        return MapToResponseDto(createdDepartment, 0);
    }

    public async Task<DepartmentResponseDto> UpdateAsync(Guid id, UpdateDepartmentDto dto)
    {
        _logger.LogInformation("Attempting to update department with Id: {Id}", id);
        var department = await _departmentRepository.GetByIdAsync(id);
        if (department == null)
        {
            _logger.LogWarning("Update department failed: Department with Id: {Id} not found.", id);
            throw new Exception("Department not found.");
        }

        department.Name = dto.Name;
        department.Code = dto.Code;
        department.Description = dto.Description ?? string.Empty;
        department.ManagerName = dto.ManagerName ?? string.Empty;
        department.ManagerEmail = dto.ManagerEmail ?? string.Empty;
        department.Location = dto.Location ?? string.Empty;
        department.Status = dto.Status;
        department.ModifiedOnUtc = DateTime.UtcNow;

        await _departmentRepository.UpdateAsync(department);
        _logger.LogInformation("Department with Id: {Id} updated successfully.", id);

        var allEmployees = await _employeeRepository.GetAllAsync();
        return MapToResponseDto(department, allEmployees.Count(e => e.Department == department.Name));
    }

    public async Task DeleteAsync(Guid id)
    {
        _logger.LogInformation("Attempting to delete department with Id: {Id}", id);
        var department = await _departmentRepository.GetByIdAsync(id);
        if (department == null)
        {
            _logger.LogWarning("Delete department failed: Department with Id: {Id} not found.", id);
            throw new Exception("Department not found.");
        }
        await _departmentRepository.DeleteAsync(id);
        _logger.LogInformation("Department with Id: {Id} deleted successfully.", id);
    }

    private static DepartmentResponseDto MapToResponseDto(Department d, int employeeCount)
    {
        return new DepartmentResponseDto
        {
            Id = d.Id,
            Name = d.Name,
            Code = d.Code,
            Description = d.Description,
            ManagerName = d.ManagerName,
            ManagerEmail = d.ManagerEmail,
            Location = d.Location,
            Status = d.Status,
            EmployeeCount = employeeCount,
            CreatedAt = d.CreatedOnUtc,
            UpdatedAt = d.ModifiedOnUtc
        };
    }
}