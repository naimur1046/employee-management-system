using EMS.Application.Common;
using EMS.Application.DTOs.Department;
using EMS.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EMS.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DepartmentController : ControllerBase
{
    private readonly IDepartmentService _departmentService;
    private readonly ILogger<DepartmentController> _logger;

    public DepartmentController(IDepartmentService departmentService, ILogger<DepartmentController> logger)
    {
        _departmentService = departmentService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<DepartmentPagedResponseDto>>> GetAll(
        [FromQuery] int pageNumber = PaginationConstants.DefaultPageNumber, 
        [FromQuery] int pageSize = PaginationConstants.DefaultPageSize)
    {
        try
        {
            _logger.LogInformation("Retrieving paged departments: Page {PageNumber}, Size {PageSize}", pageNumber, pageSize);
            var result = await _departmentService.GetPagedAsync(pageNumber, pageSize);
            return Ok(ApiResponse<DepartmentPagedResponseDto>.SuccessResponse(result, "Departments retrieved successfully!"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving paged departments: Page {PageNumber}, Size {PageSize}", pageNumber, pageSize);
            return BadRequest(ApiResponse<DepartmentPagedResponseDto>.FailureResponse(ex.Message));
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<DepartmentResponseDto>>> GetById(Guid id)
    {
        try
        {
            _logger.LogInformation("Retrieving department by Id: {DepartmentId}", id);
            var result = await _departmentService.GetByIdAsync(id);
            return Ok(ApiResponse<DepartmentResponseDto>.SuccessResponse(result, "Department retrieved successfully!"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving department by Id: {DepartmentId}", id);
            return BadRequest(ApiResponse<DepartmentResponseDto>.FailureResponse(ex.Message));
        }
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<DepartmentResponseDto>>> Create([FromBody] CreateDepartmentDto dto)
    {
        try
        {
            _logger.LogInformation("Creating new department with code: {Code}", dto.Code);
            var result = await _departmentService.CreateAsync(dto);
            return Ok(ApiResponse<DepartmentResponseDto>.SuccessResponse(result, "Department created successfully!"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating department with code: {Code}", dto.Code);
            return BadRequest(ApiResponse<DepartmentResponseDto>.FailureResponse(ex.Message));
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<DepartmentResponseDto>>> Update(Guid id, [FromBody] UpdateDepartmentDto dto)
    {
        try
        {
            _logger.LogInformation("Updating department with Id: {DepartmentId}", id);
            var result = await _departmentService.UpdateAsync(id, dto);
            return Ok(ApiResponse<DepartmentResponseDto>.SuccessResponse(result, "Department updated successfully!"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating department with Id: {DepartmentId}", id);
            return BadRequest(ApiResponse<DepartmentResponseDto>.FailureResponse(ex.Message));
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<bool>>> Delete(Guid id)
    {
        try
        {
            _logger.LogInformation("Deleting department with Id: {DepartmentId}", id);
            await _departmentService.DeleteAsync(id);
            return Ok(ApiResponse<bool>.SuccessResponse(true, "Department deleted successfully!"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting department with Id: {DepartmentId}", id);
            return BadRequest(ApiResponse<bool>.FailureResponse(ex.Message));
        }
    }
}