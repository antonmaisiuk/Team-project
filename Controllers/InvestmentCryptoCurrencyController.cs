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

        [HttpPost("Add")]
        public ActionResult CreateCryptoCurrency([FromBody] CreateInvestmentCryptoCurrencyDto dto/*, int typeId*/)
        {
            var crypto = _mapper.Map<InvestmentCryptoCurrency>(dto);

            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            var userId = int.Parse(token.Issuer);
            crypto.AccountId = userId;


            //Jeśli nie otrzymamy Id rodzaju to wstawiamy domyślnie Id 0
            //if (typeId == null)
            //{
            //    crypto.TypeCryptoCurrencyId = 0;
            //}
            //else
            //{
            //    crypto.TypeCryptoCurrencyId = typeId;
            //}

            //Sprawdzenie czy istnieje w bazie inwestycja o takiej kategorii
            var existingCrypto = _dbContext.InvestmentCryptoCurrencies
    .FirstOrDefault(c => c.TypeCryptoCurrencyId == crypto.TypeCryptoCurrencyId && c.AccountId == userId);

            if (existingCrypto != null)
            {
                existingCrypto.Amount += crypto.Amount;
                _dbContext.SaveChanges();
                return Ok(existingCrypto);
            }
            else
            {
                _dbContext.InvestmentCryptoCurrencies.Add(crypto);
                _dbContext.SaveChanges();

                var cryptoList = _dbContext
                    .InvestmentCryptoCurrencies.Where(r => r.Account.Id == userId)
                    .ToList();
                return Ok(crypto);
            }
        }

        [HttpGet("types")]
        public ActionResult<IEnumerable<InvestmentCryptoCurrency>> GetUniqueCryptocurrencies()
        {
            var cryptocurrencies = _dbContext.TypeCryptoCurrencies.ToList();
                //.Select(t => new { Cryptocurrency = t.TypeCryptoCurrency })
                //.Distinct()
                //.ToList();

            return Ok(cryptocurrencies);
        }

        [HttpGet("cryptocurrenciesSum")]
        public ActionResult<InvestmentCryptoCurrency> GetSumOfCryptoCurrencies()
        {
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            int userId = int.Parse(token.Issuer);

            decimal cryptoSum = _dbContext
                .InvestmentCryptoCurrencies.Where(r => r.Account.Id == userId).Sum(c => c.Amount);

            return Ok(cryptoSum);
        }
    }
}
