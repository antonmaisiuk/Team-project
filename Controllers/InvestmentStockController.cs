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

        [HttpPost]
        public ActionResult<InvestmentStock> DeleteStock(int stockId)
        {
            var stockToDelete = _dbContext.InvestmentStocks.SingleOrDefault(t => t.Id == stockId);

            if (stockToDelete != null)
            {
                _dbContext.InvestmentStocks.Remove(stockToDelete);
                _dbContext.SaveChanges();
                return Ok(stockToDelete);
            }
            else return NotFound(stockId);
        }

        [HttpPost("addStock")]
        public ActionResult CreateStock([FromBody] CreateInvestmentStockDto dto, int typeId)
        {
            var stock = _mapper.Map<InvestmentStock>(dto);

            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            var userId = int.Parse(token.Issuer);
            stock.AccountId = userId;


            //Jeśli nie otrzymamy Id rodzaju to wstawiamy domyślnie Id 0
            if (typeId == null)
            {
                stock.TypeStockId = 0;
            }
            else
            {
                stock.TypeStockId = typeId; 
            }

            //Sprawdzenie czy istnieje w bazie inwestycja o takiej kategorii
            var existingStock = _dbContext.InvestmentStocks
    .FirstOrDefault(c => c.TypeStockId == stock.TypeStockId && c.AccountId == userId);

            if (existingStock != null)
            {
                existingStock.Amount += stock.Amount;
                _dbContext.SaveChanges();
                return Ok(existingStock);
            }
            else
            {
                _dbContext.InvestmentStocks.Add(stock);
                _dbContext.SaveChanges();

                var stockList = _dbContext
                    .InvestmentStocks.Where(r => r.Account.Id == userId)
                    .ToList();

                return Ok(stock);
            }
        }

        [HttpGet]
        public List<object> GetUniqueStocks()
        {
            var stocks = _dbContext.InvestmentStocks
                .Select(t => new { Stock = t.TypeStock })
                .Distinct()
                .ToList<object>();

            return stocks;
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

