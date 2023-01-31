using AutoMapper;
using Elaborate.Elaborate.Entities;
using Elaborate.Entities;
using Elaborate.Helpers;
using Elaborate.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Controllers
{
    public class InvestmentCryptoCurrencyController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly JwtService _jwtService;

        public InvestmentCryptoCurrencyController(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpPost]
        public ActionResult<Transaction> DeleteCryptoCurrency(int cryptoCurrencyId)
        {
            var cryptoCurrencyToDelete = _dbContext.InvestmentCryptoCurrencies.SingleOrDefault(t => t.Id == cryptoCurrencyId);

            if (cryptoCurrencyToDelete != null)
            {
                _dbContext.InvestmentCryptoCurrencies.Remove(cryptoCurrencyToDelete);
                _dbContext.SaveChanges();
                return Ok(cryptoCurrencyToDelete);
            }
            else return NotFound(cryptoCurrencyId);
        }
    }
}
