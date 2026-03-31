using EMS.Application.DTOs.Auth;
using EMS.Application.Interfaces;
using EMS.Domain.Entities;
using EMS.Domain.Enums;
using EMS.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EMS.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthService> _logger;

    public AuthService(IUserRepository userRepository, IConfiguration configuration, ILogger<AuthService> logger)
    {
        _userRepository = userRepository;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<AuthResponseDto> Register(RegisterDto registerDto)
    {
        _logger.LogInformation("Attempting to register new user with email: {Email}", registerDto.Email);
        var existingUser = await _userRepository.GetByEmailAsync(registerDto.Email);
        if (existingUser != null)
        {
            _logger.LogWarning("Registration failed: User with email {Email} already exists.", registerDto.Email);
            throw new Exception("User with this email already exists.");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Name = registerDto.Name,
            Email = registerDto.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
            MobileNumber = registerDto.MobileNumber,
            Role = registerDto.Role,
            Status = registerDto.Status
        };

        var token = GenerateJwtToken(user);
        await _userRepository.AddAsync(user);
        _logger.LogInformation("User with email {Email} registered successfully.", registerDto.Email);

        return new AuthResponseDto
        {
            Token = token,
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            MobileNumber = user.MobileNumber,
            Role = user.Role,
            Status = user.Status
        };
    }

    public async Task<AuthResponseDto> Login(LoginDto loginDto)
    {
        _logger.LogInformation("Attempting login for user: {Email}", loginDto.Email);
        var user = await _userRepository.GetByEmailAsync(loginDto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
        {
            _logger.LogWarning("Invalid login attempt for email: {Email}", loginDto.Email);
            throw new Exception("Invalid email or password.");
        }

        var token = GenerateJwtToken(user);
        _logger.LogInformation("User {Email} logged in successfully.", loginDto.Email);

        return new AuthResponseDto
        {
            Token = token,
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            MobileNumber = user.MobileNumber,
            Role = user.Role,
            Status = user.Status
        };
    }

    private string GenerateJwtToken(User user)
    {
        var jwtSettings = _configuration.GetSection("Jwt");
        var key = Encoding.ASCII.GetBytes(jwtSettings["Key"] ?? throw new InvalidOperationException("JWT Key is not configured"));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            }),
            Expires = DateTime.UtcNow.AddHours(3),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = jwtSettings["Issuer"],
            Audience = jwtSettings["Audience"]
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}