using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Elaborate.Data;
using Elaborate.Models;
using Elaborate.Elaborate.Entities;
using Elaborate.Helpers;

namespace Elaborate.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAccountRepository _repository;
        private readonly JwtService _jwtService;
        /// <summary>
        /// Konstruktor
        /// </summary>
        public AuthController(IAccountRepository repository, JwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }


        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var account = new Account
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Phone = dto.Phone

            };

            return Created("succes", _repository.Create(account));
        }


        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _repository.GetByEmail(dto.Email);

            if (user == null) return BadRequest(new { message = "Invalid Credentials" });

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            var jwt = _jwtService.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new Microsoft.AspNetCore.Http.CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new
            {
                message = "success"
            });
        }
        
        [HttpGet("user")]
        public IActionResult User()
        {
            //try
            //{
                var jwt = Request.Cookies["jwt"];

                if (jwt != null)
                {
                    var token = _jwtService.Verify(jwt);

                    int userId = int.Parse(token.Issuer);
                    var user = _repository.GetById(userId);

                    return Ok(user);
                }
                else
                {
                    return Unauthorized();
                }
                
            //}catch(Exception _)
            //{
            //    return Unauthorized();
            //}
        }
<<<<<<< HEAD
        [HttpPost("logout")]

        public IActionResult Logout()
        {
            Response.Cookies.Delete("jtw");

            return Ok(new
            {
                message = "success"

            });
        }

=======

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "succes"
            });
        }
>>>>>>> 188f6347436d7284a6a3b896244c63b68f844232
    }
}
