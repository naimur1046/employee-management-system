using EMS.Application.Common;
using EMS.Application.DTOs.Employee;
using EMS.Application.Interfaces;
using EMS.Domain.Entities;
using EMS.Domain.Interfaces;

namespace EMS.Application.Services;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _employeeRepository;

    public EmployeeService(IEmployeeRepository employeeRepository)
    {
        _employeeRepository = employeeRepository;
    }

    public async Task<IEnumerable<EmployeeResponseDto>> GetAllAsync()
    {
        var employees = await _employeeRepository.GetAllAsync();
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
        var employee = await _employeeRepository.GetByIdAsync(id);
        if (employee == null)
        {
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
        var existingEmployee = await _employeeRepository.GetByEmailAsync(dto.OfficeEmail);
        if (existingEmployee != null)
        {
            throw new Exception("Employee with this office email already exists.");
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
        var employee = await _employeeRepository.GetByIdAsync(id);
        if (employee == null)
        {
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
        var employee = await _employeeRepository.GetByIdAsync(id);
        if (employee == null)
        {
            throw new Exception("Employee not found.");
        }
        await _employeeRepository.DeleteAsync(id);
    }
}
