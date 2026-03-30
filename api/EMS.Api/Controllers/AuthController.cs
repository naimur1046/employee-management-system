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
    private readonly ILogger<AuthController> _logger;

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    [HttpPost("register")]
    public async Task<ActionResult<ApiResponse<AuthResponseDto>>> Register([FromBody] RegisterDto registerDto)
    {
        _logger.LogInformation("Registration attempt for email: {Email}", registerDto.Email);
        try
        {
            var result = await _authService.Register(registerDto);
            _logger.LogInformation("User registered successfully: {Email}", registerDto.Email);
            return Ok(ApiResponse<AuthResponseDto>.SuccessResponse(result, "Registration successful!"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Registration failed for email: {Email}", registerDto.Email);
            return BadRequest(ApiResponse<AuthResponseDto>.FailureResponse(ex.Message));
        }
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<AuthResponseDto>>> Login([FromBody] LoginDto loginDto)
    {
        _logger.LogInformation("Login attempt for email: {Email}", loginDto.Email);
        try
        {
            var result = await _authService.Login(loginDto);
            _logger.LogInformation("User logged in successfully: {Email}", loginDto.Email);
            return Ok(ApiResponse<AuthResponseDto>.SuccessResponse(result, "Login successful!"));
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Login failed for email: {Email}", loginDto.Email);
            return BadRequest(ApiResponse<AuthResponseDto>.FailureResponse(ex.Message));
        }
    }
}