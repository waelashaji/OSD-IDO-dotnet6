using IDO.Data;
using IDO.Models;
using IDO_dotnet6.dotnet.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace IDO_dotnet6.dotnet.Services
{
    public class UserService : ControllerBase, IUserService
    {
        private IDODBContext _context;
        public UserService(IDODBContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<User>> login(User request)
        {
            var user = await _context.Users.SingleAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return BadRequest("Invalid Email");
            }
            if (user.Password != request.Password)
            {
                return BadRequest("Incorrect Password");
            }

            var token = createToken(user);

            user.Token = token;

            await _context.SaveChangesAsync();

            var DTO = new DTO
            {
                Id = user.Id,
                Token = token,
                Email = user.Email
            };
            return Ok(DTO);
        }

        public async Task<ActionResult<User>> authorize(User request)
        {
            var user = await _context.Users.SingleAsync(u => u.Token == request.Token);
            if (user == null)
            {
                return BadRequest("unauthorized");
            }
            var DTO = new DTO
            {
                Id = user.Id,
                Email = user.Email
            };
            return Ok(DTO);
        }
        private string createToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Email)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("Secret key 12345 Secret key 12345 Secret key 12345"));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

    }
}
