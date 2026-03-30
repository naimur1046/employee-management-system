using EMS.Application.Common;
using EMS.Application.DTOs.Employee;
using EMS.Application.Interfaces;
using EMS.Domain.Entities;
using EMS.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace EMS.Application.Services;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _employeeRepository;
    private readonly ILogger<EmployeeService> _logger;

    public EmployeeService(IEmployeeRepository employeeRepository, ILogger<EmployeeService> logger)
    {
        _employeeRepository = employeeRepository;
        _logger = logger;
    }

    public async Task<IEnumerable<EmployeeResponseDto>> GetAllAsync()
    {
        _logger.LogInformation("Fetching all employees.");
        var employees = await _employeeRepository.GetAllAsync();
        _logger.LogInformation("Successfully fetched {Count} employees.", employees.Count());
        
        return employees.Select(e => new EmployeeResponseDto
        {
            Id = e.Id,
            Department = e.Department,
            FullName = e.FullName,
            ContactNumber = e.ContactNumber,
            Organization = e.Organization,
            Branch = e.Branch,
            Campus = e.Campus,
            BloodGroup = e.BloodGroup,
            OfficeEmail = e.OfficeEmail,
            Pin = e.Pin,
            Name = e.Name,
            Designation = e.Designation
        });
    }

    public async Task<EmployeePagedResponseDto> GetPagedAsync(int pageNumber, int pageSize)
    {
        _logger.LogInformation("Fetching paged employees. Page: {PageNumber}, Size: {PageSize}", pageNumber, pageSize);
        var (employees, totalCount) = await _employeeRepository.GetPagedAsync(pageNumber, pageSize);
        
        var employeeDtos = employees.Select(e => new EmployeeResponseDto
        {
            Id = e.Id,
            Department = e.Department,
            FullName = e.FullName,
            ContactNumber = e.ContactNumber,
            Organization = e.Organization,
            Branch = e.Branch,
            Campus = e.Campus,
            BloodGroup = e.BloodGroup,
            OfficeEmail = e.OfficeEmail,
            Pin = e.Pin,
            Name = e.Name,
            Designation = e.Designation
        });

        var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
        _logger.LogInformation("Successfully fetched {Count} employees for page {PageNumber}. Total count: {TotalCount}", employeeDtos.Count(), pageNumber, totalCount);

        return new EmployeePagedResponseDto
        {
            Employees = employeeDtos,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalPages = totalPages,
            HasPreviousPage = pageNumber > 1,
            HasNextPage = pageNumber < totalPages
        };
    }

    public async Task<EmployeeResponseDto> GetByIdAsync(Guid id)
    {
        _logger.LogInformation("Fetching employee by Id: {Id}", id);
        var employee = await _employeeRepository.GetByIdAsync(id);
        if (employee == null)
        {
            _logger.LogWarning("Employee with Id: {Id} not found.", id);
            throw new Exception("Employee not found.");
        }
        
        return new EmployeeResponseDto
        {
            Id = employee.Id,
            Department = employee.Department,
            FullName = employee.FullName,
            ContactNumber = employee.ContactNumber,
            Organization = employee.Organization,
            Branch = employee.Branch,
            Campus = employee.Campus,
            BloodGroup = employee.BloodGroup,
            OfficeEmail = employee.OfficeEmail,
            Pin = employee.Pin,
            Name = employee.Name,
            Designation = employee.Designation
        };
    }

    public async Task<EmployeeResponseDto> CreateAsync(CreateEmployeeDto dto)
    {
        _logger.LogInformation("Attempting to create employee with email: {Email}", dto.OfficeEmail);
        var existingEmployee = await _employeeRepository.GetByEmailAsync(dto.OfficeEmail);
        if (existingEmployee != null)
        {
            if (!existingEmployee.IsDeleted)
            {
                _logger.LogWarning("Create employee failed: Employee with email {Email} already exists.", dto.OfficeEmail);
                throw new Exception("Employee with this office email already exists.");
            }
            
            _logger.LogInformation("Re-activating deleted employee with email: {Email}", dto.OfficeEmail);
            existingEmployee.Department = dto.Department;
            existingEmployee.FullName = dto.FullName;
            existingEmployee.ContactNumber = dto.ContactNumber;
            existingEmployee.Organization = dto.Organization;
            existingEmployee.Branch = dto.Branch;
            existingEmployee.Campus = dto.Campus;
            existingEmployee.BloodGroup = dto.BloodGroup;
            existingEmployee.Pin = dto.Pin;
            existingEmployee.Name = dto.Name;
            existingEmployee.Designation = dto.Designation;
            existingEmployee.IsDeleted = false;
            existingEmployee.DeletedOnUtc = null;
            existingEmployee.ModifiedOnUtc = DateTime.UtcNow;

            await _employeeRepository.UpdateAsync(existingEmployee);
            _logger.LogInformation("Employee with email: {Email} re-activated with Id: {Id}", dto.OfficeEmail, existingEmployee.Id);
            
            return new EmployeeResponseDto
            {
                Id = existingEmployee.Id,
                Department = existingEmployee.Department,
                FullName = existingEmployee.FullName,
                ContactNumber = existingEmployee.ContactNumber,
                Organization = existingEmployee.Organization,
                Branch = existingEmployee.Branch,
                Campus = existingEmployee.Campus,
                BloodGroup = existingEmployee.BloodGroup,
                OfficeEmail = existingEmployee.OfficeEmail,
                Pin = existingEmployee.Pin,
                Name = existingEmployee.Name,
                Designation = existingEmployee.Designation
            };
        }

        var employee = new Employee
        {
            Department = dto.Department,
            FullName = dto.FullName,
            ContactNumber = dto.ContactNumber,
            Organization = dto.Organization,
            Branch = dto.Branch,
            Campus = dto.Campus,
            BloodGroup = dto.BloodGroup,
            OfficeEmail = dto.OfficeEmail,
            Pin = dto.Pin,
            Name = dto.Name,
            Designation = dto.Designation
        };

        var createdEmployee = await _employeeRepository.AddAsync(employee);
        _logger.LogInformation("Employee with Id: {Id} created successfully.", createdEmployee.Id);
        
        return new EmployeeResponseDto
        {
            Id = createdEmployee.Id,
            Department = createdEmployee.Department,
            FullName = createdEmployee.FullName,
            ContactNumber = createdEmployee.ContactNumber,
            Organization = createdEmployee.Organization,
            Branch = createdEmployee.Branch,
            Campus = createdEmployee.Campus,
            BloodGroup = createdEmployee.BloodGroup,
            OfficeEmail = createdEmployee.OfficeEmail,
            Pin = createdEmployee.Pin,
            Name = createdEmployee.Name,
            Designation = createdEmployee.Designation
        };
    }

    public async Task<EmployeeResponseDto> UpdateAsync(Guid id, UpdateEmployeeDto dto)
    {
        _logger.LogInformation("Attempting to update employee with Id: {Id}", id);
        var employee = await _employeeRepository.GetByIdAsync(id);
        if (employee == null)
        {
            _logger.LogWarning("Update employee failed: Employee with Id: {Id} not found.", id);
            throw new Exception("Employee not found.");
        }

        employee.Department = dto.Department;
        employee.FullName = dto.FullName;
        employee.ContactNumber = dto.ContactNumber;
        employee.Organization = dto.Organization;
        employee.Branch = dto.Branch;
        employee.Campus = dto.Campus;
        employee.BloodGroup = dto.BloodGroup;
        employee.OfficeEmail = dto.OfficeEmail;
        employee.Pin = dto.Pin;
        employee.Name = dto.Name;
        employee.Designation = dto.Designation;
        employee.ModifiedOnUtc = DateTime.UtcNow;

        await _employeeRepository.UpdateAsync(employee);
        _logger.LogInformation("Employee with Id: {Id} updated successfully.", id);

        return new EmployeeResponseDto
        {
            Id = employee.Id,
            Department = employee.Department,
            FullName = employee.FullName,
            ContactNumber = employee.ContactNumber,
            Organization = employee.Organization,
            Branch = employee.Branch,
            Campus = employee.Campus,
            BloodGroup = employee.BloodGroup,
            OfficeEmail = employee.OfficeEmail,
            Pin = employee.Pin,
            Name = employee.Name,
            Designation = employee.Designation
        };
    }

    public async Task DeleteAsync(Guid id)
    {
        _logger.LogInformation("Attempting to delete employee with Id: {Id}", id);
        var employee = await _employeeRepository.GetByIdAsync(id);
        if (employee == null)
        {
            _logger.LogWarning("Delete employee failed: Employee with Id: {Id} not found.", id);
            throw new Exception("Employee not found.");
        }
        await _employeeRepository.DeleteAsync(id);
        _logger.LogInformation("Employee with Id: {Id} deleted successfully.", id);
    }
}
