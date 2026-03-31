using EMS.Application.Common;
using EMS.Application.DTOs.Dashboard;
using EMS.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EMS.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;
    private readonly ILogger<DashboardController> _logger;

    public DashboardController(IDashboardService dashboardService, ILogger<DashboardController> logger)
    {
        _dashboardService = dashboardService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<DashboardResponseDto>>> GetDashboardData()
    {
        try
        {
            _logger.LogInformation("Retrieving dashboard data.");
            var result = await _dashboardService.GetDashboardDataAsync();
            return Ok(ApiResponse<DashboardResponseDto>.SuccessResponse(result, "Dashboard data retrieved successfully!"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving dashboard data.");
            return BadRequest(ApiResponse<DashboardResponseDto>.FailureResponse(ex.Message));
        }
    }
}