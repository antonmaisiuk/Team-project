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
    public class InvestmentPeciousMetalController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly JwtService _jwtService;

        public InvestmentPeciousMetalController(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
  
        [Route("investments")]
        public ActionResult<IEnumerable<InvestmentPreciousMetals>> GetAll()
        {
            var jwt = Request.Cookies["jwt"];

            var token = _jwtService.Verify(jwt);

            int userId = int.Parse(token.Issuer);

            var investmentsPreciousMetal = _dbContext
            .InvestmentsPreciousMetals.Where(r => r.Account.Id == userId)
            .ToList();

            return Ok(investmentsPreciousMetal);
        }

        [HttpPost("addinvestment")]
        public ActionResult CreateInvestment([FromBody] InvestmentPreciousMetalsDto dto)
        {
            var investment = _mapper.Map<InvestmentPreciousMetals>(dto);
            _dbContext.InvestmentsPreciousMetals.Add(investment);
            _dbContext.SaveChanges();

            var investmentList = _dbContext
                .InvestmentsPreciousMetals
                .ToList();

            return Ok(investmentList);
        }
        [HttpPost]
        public ActionResult<InvestmentPreciousMetals> DeleteInvestment(int investmentId)
        {
            var InvestmentToDelete = _dbContext.InvestmentsPreciousMetals.SingleOrDefault(t => t.Id == investmentId);

            if (InvestmentToDelete != null)
            {
                _dbContext.InvestmentsPreciousMetals.Remove(InvestmentToDelete);
                _dbContext.SaveChanges();
                return Ok(InvestmentToDelete);
            }
            else return NotFound(investmentId);
        }
        [HttpGet("InvestmentSum")]
        public ActionResult<InvestmentPreciousMetals> GetSumOfInvestments()
        {
            decimal InvestmentSum = _dbContext
                .InvestmentsPreciousMetals
                .Sum(t => t.ValueOfInvestment);
            return Ok(InvestmentSum);
        }



    }

}
