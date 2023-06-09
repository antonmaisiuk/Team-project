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
    [Route("api/[controller]")] 
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

        [HttpDelete("DeleteInvestment/{typeId}")]
        public ActionResult<InvestmentCryptoCurrency> DeleteCryptoCurrency([FromRoute] int typeId)
        {
            var jwt = Request.Cookies["jwt"];

            var token = _jwtService.Verify(jwt);

            int userId = int.Parse(token.Issuer);
            var investmentToDelete = _dbContext.InvestmentCryptoCurrencies.Where(r => r.Account.Id == userId).SingleOrDefault(t => t.TypeId == typeId);

            if (investmentToDelete != null)
            {
                _dbContext.InvestmentCryptoCurrencies.Remove(investmentToDelete);
                _dbContext.SaveChanges();
                return Ok(investmentToDelete);
            }
            else return NotFound(typeId);
        }

        [HttpPost("Add")]
        public ActionResult CreateCryptoCurrency([FromBody] CreateInvestmentCryptoCurrencyDto dto, int typeId)
        {
            var crypto = _mapper.Map<InvestmentCryptoCurrency>(dto);

            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            var userId = int.Parse(token.Issuer);
            crypto.AccountId = userId;




            //Sprawdzenie czy istnieje w bazie inwestycja o takiej kategorii
            var existingCrypto = _dbContext.InvestmentCryptoCurrencies
    .FirstOrDefault(c => c.TypeId == crypto.TypeId && c.AccountId == userId);

            if (existingCrypto != null)
            {
                existingCrypto.Amount += crypto.Amount;
                _dbContext.SaveChanges();

                var list = _dbContext
                    .InvestmentCryptoCurrencies.Where(r => r.Account.Id == userId)
                    .ToList();
                decimal sum = _dbContext
                .InvestmentCryptoCurrencies.Where(r => r.Account.Id == userId).Sum(c => c.Amount);

                Object[] resultArr = new Object[] { list, sum };

                return Ok(resultArr);
            }
            else
            {
                _dbContext.InvestmentCryptoCurrencies.Add(crypto);
                _dbContext.SaveChanges();

                var list = _dbContext
                    .InvestmentCryptoCurrencies.Where(r => r.Account.Id == userId)
                    .ToList();
                decimal sum = _dbContext
                .InvestmentCryptoCurrencies.Where(r => r.Account.Id == userId).Sum(c => c.Amount);

                Object[] resultArr = new Object[] { list, sum };

                return Ok(resultArr);
            }
        }

        [HttpPut("EditInvestment/{typeId}")]
        public async Task<ActionResult> EditInvestment([FromRoute] int typeId, [FromBody] InvestmentCryptoCurrency dto)
        {
            var jwt = Request.Cookies["jwt"];

            var token = _jwtService.Verify(jwt);

            int userId = int.Parse(token.Issuer);

            var investmentToEdit = _dbContext.InvestmentCryptoCurrencies.Where(r => r.Account.Id == userId).FirstOrDefault(i => i.TypeId == typeId);

            if (investmentToEdit is null)
            {
                return NotFound("Nie znaleziono inwestycji o podanym id");
            }


            if (dto.Amount > 0 && dto.Amount < decimal.MaxValue)
            {
                investmentToEdit.Amount = dto.Amount;
            }
            else
            {
                return BadRequest("Nieodpowiednia ilość");
            }


            await _dbContext.SaveChangesAsync();

            return Ok(investmentToEdit);
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
