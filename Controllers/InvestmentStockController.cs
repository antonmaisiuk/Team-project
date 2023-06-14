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
    public class InvestmentStockController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly JwtService _jwtService;

        public InvestmentStockController(ApplicationDbContext dbContext, IMapper mapper, JwtService jwtService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _jwtService = jwtService;
        }

        [HttpGet("stocks")]
        public ActionResult<IEnumerable<InvestmentStock>> GetAll()
        {
            var jwt = Request.Cookies["jwt"];

            var token = _jwtService.Verify(jwt);

            int userId = int.Parse(token.Issuer);

            var investmentStocks = _dbContext
            .InvestmentStocks.Where(r => r.Account.Id == userId)
            .ToList();

            return Ok(investmentStocks);
        }

        [HttpDelete("DeleteInvestment/{typeId}")]
        public ActionResult<InvestmentStock> DeleteStock([FromRoute] int typeId)
        {
            var jwt = Request.Cookies["jwt"];

            var token = _jwtService.Verify(jwt);

            int userId = int.Parse(token.Issuer);
            var stockToDelete = _dbContext.InvestmentStocks.Where(r => r.Account.Id == userId).SingleOrDefault(t => t.TypeId == typeId);

            if (stockToDelete != null)
            {
                _dbContext.InvestmentStocks.Remove(stockToDelete);
                _dbContext.SaveChanges();

                var stockList = _dbContext
                    .InvestmentStocks.Where(r => r.Account.Id == userId)
                    .ToList();

                double stocksSum = _dbContext
                .InvestmentStocks.Where(r => r.Account.Id == userId).Sum(c => c.Amount);

                Object[] resultArr = new Object[] { stockList, stocksSum };

                return Ok(resultArr);
            }
            else return NotFound(typeId);
        }

        [HttpPost("Add")]
        public ActionResult CreateStock([FromBody] CreateInvestmentStockDto dto/*, int typeId*/)
        {
            var stock = _mapper.Map<InvestmentStock>(dto);

            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            var userId = int.Parse(token.Issuer);
            stock.AccountId = userId;


            //Sprawdzenie czy istnieje w bazie inwestycja o takiej kategorii
            var existingStock = _dbContext.InvestmentStocks
    .FirstOrDefault(c => c.TypeId == stock.TypeId && c.AccountId == userId);

            if (existingStock != null)
            {
                existingStock.Amount += stock.Amount;
                _dbContext.SaveChanges();

                var stockList = _dbContext
                    .InvestmentStocks.Where(r => r.Account.Id == userId)
                    .ToList();
                double stocksSum = _dbContext
                .InvestmentStocks.Where(r => r.Account.Id == userId).Sum(c => c.Amount);

                Object[] resultArr = new Object[] { stockList, stocksSum };

                return Ok(resultArr);
            }
            else
            {
                _dbContext.InvestmentStocks.Add(stock);
                _dbContext.SaveChanges();

                var stockList = _dbContext
                    .InvestmentStocks.Where(r => r.Account.Id == userId)
                    .ToList();

                double stocksSum = _dbContext
                .InvestmentStocks.Where(r => r.Account.Id == userId).Sum(c => c.Amount);

                Object[] resultArr = new Object[] { stockList, stocksSum };

                return Ok(resultArr);
            }
        }

        [HttpPut("EditInvestment/{typeId}")]
        public async Task<ActionResult> EditInvestment([FromRoute] int typeId, [FromBody] InvestmentStock dto)
        {
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            int userId = int.Parse(token.Issuer);

            var investmentToEdit = _dbContext.InvestmentStocks.Where(r => r.Account.Id == userId).FirstOrDefault(i => i.TypeId == typeId);

            if (investmentToEdit is null)
            {
                return NotFound("Nie znaleziono inwestycji o podanym id");
            }


            if (dto.Amount > 0 && dto.Amount < double.MaxValue)
            {
                investmentToEdit.Amount = dto.Amount;
            }
            else
            {
                return BadRequest("Nieodpowiednia ilość");
            }


            await _dbContext.SaveChangesAsync();

            var stockList = _dbContext
                    .InvestmentStocks.Where(r => r.Account.Id == userId)
                    .ToList();

            double stocksSum = _dbContext
            .InvestmentStocks.Where(r => r.Account.Id == userId).Sum(c => c.Amount);

            Object[] resultArr = new Object[] { stockList, stocksSum };

            return Ok(resultArr);

            //return Ok(investmentToEdit);
        }

        [HttpGet("types")]
        public ActionResult<IEnumerable<InvestmentStock>> GetUniqueStocks()
        {
            var stocks = _dbContext.TypeStocks.ToList();

            return Ok(stocks);
        }

        [HttpGet("StocksSum")]
        public ActionResult<InvestmentStock> GetSumOfStocks()
        {
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            int userId = int.Parse(token.Issuer);

            double StocksSum = _dbContext
                .InvestmentStocks.Where(r => r.Account.Id == userId).Sum(c => c.Amount);

            return Ok(StocksSum);
        }
    }
}

