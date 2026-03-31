using EMS.Application.DTOs.Dashboard;
using EMS.Application.Interfaces;
using EMS.Domain.Enums;
using EMS.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace EMS.Application.Services;

public interface IDashboardService
{
    Task<DashboardResponseDto> GetDashboardDataAsync();
}

public class DashboardService : IDashboardService
{
    private readonly IEmployeeRepository _employeeRepository;
    private readonly IDepartmentRepository _departmentRepository;
    private readonly IUserRepository _userRepository;
    private readonly ILogger<DashboardService> _logger;

    public DashboardService(
        IEmployeeRepository employeeRepository,
        IDepartmentRepository departmentRepository,
        IUserRepository userRepository,
        ILogger<DashboardService> logger)
    {
        _employeeRepository = employeeRepository;
        _departmentRepository = departmentRepository;
        _userRepository = userRepository;
        _logger = logger;
    }

    public async Task<DashboardResponseDto> GetDashboardDataAsync()
    {
        _logger.LogInformation("Generating dashboard statistics.");
        
        var employees = await _employeeRepository.GetAllAsync();
        var departments = (await _departmentRepository.GetAllAsync()).ToList();
        var users = await _userRepository.GetAllAsync();

        var stats = new DashboardStatsDto
        {
            TotalEmployees = employees.Count(),
            TotalDepartments = departments.Count,
            ActiveDepartments = departments.Count(d => d.Status == DepartmentStatus.Active),
            TotalUsers = users.Count()
        };
        
        var recentEmployees = employees
            .OrderByDescending(e => e.CreatedOnUtc)
            .Take(5)
            .Select(e => new RecentActivityDto
            {
                Id = e.Id,
                Action = "New employee registered",
                EntityName = e.FullName,
                Timestamp = e.CreatedOnUtc,
                ActivityType = "add"
            });

        var recentDepartments = departments
            .OrderByDescending(d => d.CreatedOnUtc)
            .Take(5)
            .Select(d => new RecentActivityDto
            {
                Id = d.Id,
                Action = "New department created",
                EntityName = d.Name,
                Timestamp = d.CreatedOnUtc,
                ActivityType = "add"
            });

        var recentActivities = recentEmployees
            .Concat(recentDepartments)
            .OrderByDescending(a => a.Timestamp)
            .Take(5)
            .ToList();

        return new DashboardResponseDto
        {
            Stats = stats,
            RecentActivities = recentActivities
        };
    }
}