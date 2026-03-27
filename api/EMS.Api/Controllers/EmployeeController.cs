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

    public EmployeeController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<EmployeeResponseDto>>>> GetAll()
    {
        try
        {
            var result = await _employeeService.GetAllAsync();
            return Ok(ApiResponse<IEnumerable<EmployeeResponseDto>>.SuccessResponse(result, "Employees retrieved successfully!"));
        }
        catch (Exception ex)
        {
            return BadRequest(ApiResponse<IEnumerable<EmployeeResponseDto>>.FailureResponse(ex.Message));
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<EmployeeResponseDto>>> GetById(Guid id)
    {
        try
        {
            var result = await _employeeService.GetByIdAsync(id);
            return Ok(ApiResponse<EmployeeResponseDto>.SuccessResponse(result, "Employee retrieved successfully!"));
        }
        catch (Exception ex)
        {
            return BadRequest(ApiResponse<EmployeeResponseDto>.FailureResponse(ex.Message));
        }
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<EmployeeResponseDto>>> Create([FromBody] CreateEmployeeDto dto)
    {
        try
        {
            var result = await _employeeService.CreateAsync(dto);
            return Ok(ApiResponse<EmployeeResponseDto>.SuccessResponse(result, "Employee created successfully!"));
        }
        catch (Exception ex)
        {
            return BadRequest(ApiResponse<EmployeeResponseDto>.FailureResponse(ex.Message));
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<EmployeeResponseDto>>> Update(Guid id, [FromBody] UpdateEmployeeDto dto)
    {
        try
        {
            var result = await _employeeService.UpdateAsync(id, dto);
            return Ok(ApiResponse<EmployeeResponseDto>.SuccessResponse(result, "Employee updated successfully!"));
        }
        catch (Exception ex)
        {
            return BadRequest(ApiResponse<EmployeeResponseDto>.FailureResponse(ex.Message));
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<bool>>> Delete(Guid id)
    {
        try
        {
            await _employeeService.DeleteAsync(id);
            return Ok(ApiResponse<bool>.SuccessResponse(true, "Employee deleted successfully!"));
        }
        catch (Exception ex)
        {
            return BadRequest(ApiResponse<bool>.FailureResponse(ex.Message));
        }
    }
}
