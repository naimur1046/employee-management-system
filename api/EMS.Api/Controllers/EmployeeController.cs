using EMS.Application.Common;
using EMS.Application.DTOs.Employee;
using EMS.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EMS.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _employeeService;
    private readonly ILogger<EmployeeController> _logger;

    public EmployeeController(IEmployeeService employeeService, ILogger<EmployeeController> logger)
    {
        _employeeService = employeeService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<EmployeePagedResponseDto>>> GetAll(
        [FromQuery] int pageNumber = PaginationConstants.DefaultPageNumber, 
        [FromQuery] int pageSize = PaginationConstants.DefaultPageSize)
    {
        try
        {
            _logger.LogInformation("Retrieving paged employees: Page {PageNumber}, Size {PageSize}", pageNumber, pageSize);
            var result = await _employeeService.GetPagedAsync(pageNumber, pageSize);
            return Ok(ApiResponse<EmployeePagedResponseDto>.SuccessResponse(result, "Employees retrieved successfully!"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving paged employees: Page {PageNumber}, Size {PageSize}", pageNumber, pageSize);
            return BadRequest(ApiResponse<EmployeePagedResponseDto>.FailureResponse(ex.Message));
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<EmployeeResponseDto>>> GetById(Guid id)
    {
        try
        {
            _logger.LogInformation("Retrieving employee by Id: {EmployeeId}", id);
            var result = await _employeeService.GetByIdAsync(id);
            return Ok(ApiResponse<EmployeeResponseDto>.SuccessResponse(result, "Employee retrieved successfully!"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving employee by Id: {EmployeeId}", id);
            return BadRequest(ApiResponse<EmployeeResponseDto>.FailureResponse(ex.Message));
        }
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<EmployeeResponseDto>>> Create([FromBody] CreateEmployeeDto dto)
    {
        try
        {
            _logger.LogInformation("Creating new employee with email: {OfficeEmail}", dto.OfficeEmail);
            var result = await _employeeService.CreateAsync(dto);
            return Ok(ApiResponse<EmployeeResponseDto>.SuccessResponse(result, "Employee created successfully!"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating employee with email: {OfficeEmail}", dto.OfficeEmail);
            return BadRequest(ApiResponse<EmployeeResponseDto>.FailureResponse(ex.Message));
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<EmployeeResponseDto>>> Update(Guid id, [FromBody] UpdateEmployeeDto dto)
    {
        try
        {
            _logger.LogInformation("Updating employee with Id: {EmployeeId}", id);
            var result = await _employeeService.UpdateAsync(id, dto);
            return Ok(ApiResponse<EmployeeResponseDto>.SuccessResponse(result, "Employee updated successfully!"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating employee with Id: {EmployeeId}", id);
            return BadRequest(ApiResponse<EmployeeResponseDto>.FailureResponse(ex.Message));
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<bool>>> Delete(Guid id)
    {
        try
        {
            _logger.LogInformation("Deleting employee with Id: {EmployeeId}", id);
            await _employeeService.DeleteAsync(id);
            return Ok(ApiResponse<bool>.SuccessResponse(true, "Employee deleted successfully!"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting employee with Id: {EmployeeId}", id);
            return BadRequest(ApiResponse<bool>.FailureResponse(ex.Message));
        }
    }
}
