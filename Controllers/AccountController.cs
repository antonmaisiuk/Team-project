using AutoMapper;
using Elaborate.Elaborate.Entities;
using Elaborate.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Controllers
{
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
     //   private readonly IMapper _mapper;

        public AccountController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            //_mapper = mapper;
        }
        /// <summary>
        /// Pobieranie wszystkich użytkwników
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<IEnumerable<Account>> GetAll()
        {
            var accounts = _dbContext
                .Accounts
                .ToList();

            return Ok(accounts);
        }
        /// <summary>
        /// Pobieranie użytkownika po Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public ActionResult<Account> Get([FromRoute] int id)
        {
            var account = _dbContext
                .Accounts
                .FirstOrDefault(r => r.Id == id);

            if (account is null)
            {
                return NotFound();
            }

            return Ok(account);
        }
    }
}
