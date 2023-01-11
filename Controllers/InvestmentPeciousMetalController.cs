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

        [HttpPost("addInvestment")]
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


        [HttpPut("updatInvestment")]
        public async Task<ActionResult> UpdateTransaction(int id, [FromBody] InvestmentPreciousMetalsDto dto)
        {
            var investmentToUpdate = _dbContext.InvestmentsPreciousMetals.FirstOrDefault(i => i.Id == id);

            if (investmentToUpdate is null)
                return NotFound("Nie znaleziono inwestycji o podanym id");

            if (dto.Amount > 0 && dto.Amount < double.MaxValue)
                investmentToUpdate.Amount = dto.Amount;
            investmentToUpdate.AccountId = dto.AccountId;
            investmentToUpdate.TypePreciousMetalId = dto.TypePreciousMetalId;

            await _dbContext.SaveChangesAsync();

            return Ok(investmentToUpdate);
        }
    }
}
