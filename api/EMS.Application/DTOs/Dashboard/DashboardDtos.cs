namespace EMS.Application.DTOs.Dashboard;

public class DashboardStatsDto
{
    public int TotalEmployees { get; set; }
    public int TotalDepartments { get; set; }
    public int ActiveDepartments { get; set; }
    public int TotalUsers { get; set; }
}

public class RecentActivityDto
{
    public Guid Id { get; set; }
    public string Action { get; set; } = string.Empty;
    public string EntityName { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public string ActivityType { get; set; } = string.Empty;
}

public class DashboardResponseDto
{
    public DashboardStatsDto Stats { get; set; } = new();
    public List<RecentActivityDto> RecentActivities { get; set; } = new();
}