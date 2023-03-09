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
        public ActionResult CreateStock([FromBody] InvestmentStock dto)
        {
            var stock = _mapper.Map<InvestmentStock>(dto);

            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            var userId = int.Parse(token.Issuer);
            stock.AccountId = userId;

            stock.TypeStockId = 1; 
            _dbContext.InvestmentStocks.Add(stock);
            _dbContext.SaveChanges();

            var stockList = _dbContext
                .InvestmentStocks.Where(r => r.Account.Id == userId)
                .ToList();

           // decimal stockSum = stockList.Sum(c => c.ValueOfInvestment);    Chwilowo zakomentowany M.K

            Object[] resultArr = new Object[] { stock, /*stockSum*/ };

            return Ok(resultArr);
        }

        /*[HttpGet("StocksSum")]   Chwilowo zakomentowany M.K
        public ActionResult<InvestmentStock> GetSumOfStocks()
        {
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            int userId = int.Parse(token.Issuer);

            decimal StocksSum = _dbContext
                .InvestmentStock.Where(r => r.Account.Id == userId).Sum(c => c.ValueOfInvestment);

            return Ok(StocksSum);
        }*/
    }
}

