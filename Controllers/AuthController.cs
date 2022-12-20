using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Elaborate.Data;
using Elaborate.Models;
using Elaborate.Elaborate.Entities;

namespace Elaborate.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAccountRepository _repository;
        /// <summary>
        /// Konstruktor
        /// </summary>
        public AuthController(IAccountRepository repository)
        {
            _repository = repository;
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
    }
}
