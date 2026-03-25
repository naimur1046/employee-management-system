using EMS.Application.Common;
using EMS.Application.DTOs.Auth;
using EMS.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EMS.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<ApiResponse<AuthResponseDto>>> Register([FromBody] RegisterDto registerDto)
    {
        try
        {
            var result = await _authService.Register(registerDto);
            return Ok(ApiResponse<AuthResponseDto>.SuccessResponse(result, "Registration successful!"));
        }
        catch (Exception ex)
        {
            return BadRequest(ApiResponse<AuthResponseDto>.FailureResponse(ex.Message));
        }
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<AuthResponseDto>>> Login([FromBody] LoginDto loginDto)
    {
        try
        {
            var result = await _authService.Login(loginDto);
            return Ok(ApiResponse<AuthResponseDto>.SuccessResponse(result, "Login successful!"));
        }
        catch (Exception ex)
        {
            return BadRequest(ApiResponse<AuthResponseDto>.FailureResponse(ex.Message));
        }
    }
}