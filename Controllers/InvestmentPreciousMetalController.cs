using AutoMapper;
using Elaborate.Elaborate.Entities;
using Elaborate.Entities;
using Elaborate.Helpers;
using Elaborate.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Controllers
{
    [Route("api/[controller]")]
    public class InvestmentPreciousMetalController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly JwtService _jwtService;

        public InvestmentPreciousMetalController(ApplicationDbContext dbContext, IMapper mapper, JwtService jwtService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _jwtService = jwtService;
        }

        [HttpGet("metals")]
        //[Route("metals")]
        public ActionResult<IEnumerable<InvestmentPreciousMetal>> GetAll()
        {
            var jwt = Request.Cookies["jwt"];

            var token = _jwtService.Verify(jwt);

            int userId = int.Parse(token.Issuer);

            var investmentsPreciousMetal = _dbContext
            .InvestmentsPreciousMetals.Where(r => r.Account.Id == userId)
            .ToList();

            return Ok(investmentsPreciousMetal);
        }

        [HttpPost("Add")]
        public ActionResult CreateInvestment([FromBody] CreateInvestmentPreciousMetalsDto dto, int typeId)
        {
            var metalInvestment = _mapper.Map<InvestmentPreciousMetal>(dto);

            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            var userId = int.Parse(token.Issuer);
            metalInvestment.AccountId = userId;

           

            //Sprawdzenie czy istnieje w bazie inwestycja o takiej kategorii
            var existingMetal = _dbContext.InvestmentsPreciousMetals
    .FirstOrDefault(c => c.TypeId == metalInvestment.TypeId && c.AccountId == userId);

            if (existingMetal != null)
            {
                existingMetal.Amount += metalInvestment.Amount;
                _dbContext.SaveChanges();

                var list = _dbContext
                    .InvestmentsPreciousMetals.Where(r => r.Account.Id == userId)
                    .ToList();
                double sum = _dbContext
                .InvestmentsPreciousMetals.Where(r => r.Account.Id == userId).Sum(c => c.Amount);

                Object[] resultArr = new Object[] { list, sum };

                return Ok(resultArr);
            }
            else
            {
                _dbContext.InvestmentsPreciousMetals.Add(metalInvestment);
                _dbContext.SaveChanges();

                var list = _dbContext
                    .InvestmentsPreciousMetals.Where(r => r.Account.Id == userId)
                    .ToList();
                double sum = _dbContext
                .InvestmentsPreciousMetals.Where(r => r.Account.Id == userId).Sum(c => c.Amount);

                Object[] resultArr = new Object[] { list, sum };

                return Ok(resultArr);
            }  
        }


        [HttpPut("updateMetals")]
        public async Task<ActionResult> UpdateTransaction(int id, [FromBody] InvestmentPreciousMetal dto)
        {
            var investmentToUpdate = _dbContext.InvestmentsPreciousMetals.FirstOrDefault(i => i.Id == id);

            if (investmentToUpdate is null)
                return NotFound("Nie znaleziono inwestycji o podanym id");

            if (dto.Amount > 0 && dto.Amount < double.MaxValue)
                investmentToUpdate.Amount = dto.Amount;
            investmentToUpdate.AccountId = dto.AccountId;
            investmentToUpdate.TypeId = dto.TypeId;

            await _dbContext.SaveChangesAsync();

            return Ok(investmentToUpdate);
        }

        [HttpDelete("DeleteInvestment/{id}")]
        public ActionResult<InvestmentPreciousMetal> DeleteInvestment([FromRoute] int id)
        {
            var investmentPreciousMetalToDelete = _dbContext.InvestmentsPreciousMetals.SingleOrDefault(t => t.Id == id);

            if (investmentPreciousMetalToDelete != null)
            {
                _dbContext.InvestmentsPreciousMetals.Remove(investmentPreciousMetalToDelete);
                _dbContext.SaveChanges();
                return Ok(investmentPreciousMetalToDelete);
            }
            else return NotFound(id);
        }

        [HttpGet("types")]
        public ActionResult<IEnumerable<InvestmentPreciousMetal>> GetUniquePreciousMetals()
        {
            var preciousMetals = _dbContext.TypesPreciousMetals.ToList();
                //.Select(t => new { PreciousMetal = t.TypePreciousMetal })
                //.Distinct()
                //.ToList();

            return Ok(preciousMetals);
        }

        [HttpGet("metalsSum")]
        //[Route("investmentsPreciousMetalSum")]
        public ActionResult<InvestmentPreciousMetal> GetSumOfInvestmentsPreciousMetal()
        {
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            int userId = int.Parse(token.Issuer);

            double metalsSum = _dbContext
            .InvestmentsPreciousMetals.Where(r => r.Account.Id == userId).Sum(t => t.Amount);

            return Ok(metalsSum);
        }
        //[HttpPost]
        //public ActionResult<InvestmentPreciousMetal> DeleteInvestment(int investmentId)
        //{
        //    var InvestmentToDelete = _dbContext.InvestmentsPreciousMetals.SingleOrDefault(t => t.Id == investmentId);

        //    if (InvestmentToDelete != null)
        //    {
        //        _dbContext.InvestmentsPreciousMetals.Remove(InvestmentToDelete);
        //        _dbContext.SaveChanges();
        //        return Ok(InvestmentToDelete);
        //    }
        //    else return NotFound(investmentId);
        //}
        /*[HttpGet("InvestmentSum")]
         public ActionResult<InvestmentPreciousMetal> GetSumOfInvestments()
         {
             decimal InvestmentSum = _dbContext
                 .InvestmentsPreciousMetals;
             return Ok(InvestmentSum);
         }*/



    }

}
