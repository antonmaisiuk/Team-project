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
    [Route("api/[controller]")] // Pytanie czy to jest potrzebne ??? 
    public class InvestmentCryptoCurrencyController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly JwtService _jwtService;

        public InvestmentCryptoCurrencyController(ApplicationDbContext dbContext, IMapper mapper, JwtService jwtService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _jwtService = jwtService;
        }

        [HttpGet("crypto")] // Zmiana w kodzie zamiast Route jest HttpGGet
        //[Route("cryptocurrencies")]
        public ActionResult<IEnumerable<InvestmentCryptoCurrency>> GetAll()
        {
            var jwt = Request.Cookies["jwt"];

            var token = _jwtService.Verify(jwt);

            int userId = int.Parse(token.Issuer);

            var investmentCryptoCurrency = _dbContext
            .InvestmentCryptoCurrencies.Where(r => r.Account.Id == userId)
            .ToList();

            return Ok(investmentCryptoCurrency);
        }

        [HttpPost]
        public ActionResult<InvestmentCryptoCurrency> DeleteCryptoCurrency(int cryptoCurrencyId)
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

        [HttpPost("addCryptoCurrency")]
        public ActionResult CreateCryptoCurrency([FromBody] TypeCryptoCurrencyDto dto)
        {
            var crypto = _mapper.Map<InvestmentCryptoCurrency>(dto);

            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            var userId = int.Parse(token.Issuer);
            crypto.AccountId = userId;

            crypto.TypeCryptoCurrencyId = 1; // Pytanie czy to jest potrzebne ??? 
            _dbContext.InvestmentCryptoCurrencies.Add(crypto);
            _dbContext.SaveChanges();

            var cryptoList = _dbContext
                .InvestmentCryptoCurrencies.Where(r => r.Account.Id == userId)
                .ToList();

            decimal cryptoSum = cryptoList.Sum(c => c.ValueOfInvestment);

            Object[] resultArr = new Object[] { crypto, cryptoSum };

            return Ok(resultArr);
        }

        [HttpGet("cryptocurrenciesSum")]
        public ActionResult<InvestmentCryptoCurrency> GetSumOfCryptoCurrencies()
        {
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            int userId = int.Parse(token.Issuer);

            decimal cryptoSum = _dbContext
                .InvestmentCryptoCurrencies.Where(r => r.Account.Id == userId).Sum(c => c.ValueOfInvestment);

            return Ok(cryptoSum);
        }
    }
}
