using EMS.Application.DTOs.Auth;

namespace EMS.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> Login(LoginDto loginDto);
    Task<AuthResponseDto> Register(RegisterDto registerDto);
}