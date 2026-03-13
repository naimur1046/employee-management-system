using EMS.Application.DTOs.Auth;

namespace EMS.Application.Interfaces;

public interface IAuthService
{
    Task<string> Login(LoginDto loginDto);
    Task<string> Register(RegisterDto registerDto);
}