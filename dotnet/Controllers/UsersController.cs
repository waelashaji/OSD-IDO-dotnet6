using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IDO.Data;
using IDO.Models;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using IDO_dotnet6.dotnet.Models;
using NuGet.Common;

namespace IDO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDODBContext _context;

        public UsersController(IDODBContext context)
        {
            _context = context;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }


        // POST: api/login
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(User request)
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


        // POST: api/auth
        [HttpPost("auth")]
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
