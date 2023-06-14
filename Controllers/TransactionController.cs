using AutoMapper;
using Elaborate.Elaborate.Entities;
using Elaborate.Entities;
using Elaborate.Helpers;
using Elaborate.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Controllers
{

    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly JwtService _jwtService;

        public TransactionController(ApplicationDbContext dbContext, IMapper mapper, JwtService jwtService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _jwtService = jwtService;
        }
        /// <summary>
        /// Pobranie listy transakcji
        /// </summary>
        /// <returns>Listę transakcji</returns>
        [HttpGet("transactions")]
        public ActionResult<IEnumerable<Transaction>> GetAll()
        {
            var jwt = Request.Cookies["jwt"];

            var token = _jwtService.Verify(jwt);

            int userId = int.Parse(token.Issuer);

            var transactions = _dbContext
            .Transactions.Where(r => r.Account.Id == userId)
            .ToList();

            return Ok(transactions);
        }

        /// <summary>
        /// Tworzenie transakcji
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// 
        [HttpPost("addTransaction")]
        public ActionResult CreateTransaction([FromBody] CreateTransactionDto dto)
        {

            var transaction = _mapper.Map<Transaction>(dto);

            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            var userId = int.Parse(token.Issuer);
            transaction.AccountId = userId;

            if(transaction.TransCategoryId == null)
            {
                transaction.TransCategoryId = 1;
            }

            _dbContext.Transactions.Add(transaction);
            _dbContext.SaveChanges();

            var transactions = _dbContext
            .Transactions.Where(r => r.Account.Id == userId)
            .ToList();

            decimal transactionSum = transactions.Sum(t => t.Value);

            Object[] resultArr = new Object[] { transactions, transactionSum };

            return Ok(resultArr);

        }

        /// <summary>
        /// Zmiana danych transakcji // Bartosz Truszkowski
        /// </summary>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTransaction([FromRoute] int id, [FromBody] UpdateTransaction updateTransaction)
        {
            var transactionToUpdate = _dbContext.Transactions.FirstOrDefault(t => t.Id == id);

            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            var userId = int.Parse(token.Issuer);

            if (transactionToUpdate is null)
                return NotFound("Nie znaleziono transakcji o podanym id");
                   
            transactionToUpdate.Title = updateTransaction.Title;
            transactionToUpdate.Value = updateTransaction.Value;
            transactionToUpdate.Date = updateTransaction.Date;
            transactionToUpdate.Comment = updateTransaction.Comment;
            transactionToUpdate.TransCategoryId = updateTransaction.TransCategoryId;


            await _dbContext.SaveChangesAsync();

            var transactions = _dbContext
            .Transactions.Where(r => r.Account.Id == userId)
            .ToList();

            decimal transactionSum = transactions.Sum(t => t.Value);

            Object[] resultArr = new Object[] { transactions, transactionSum };

            return Ok(resultArr);
        }

        /// <summary>
        /// Metoda do usuwania transakcji
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("DeleteTransaction/{id}")]
        public ActionResult<Transaction> DeleteTransaction([FromRoute] int id)
        {
            var transactionToDelete = _dbContext.Transactions.SingleOrDefault(t => t.Id == id);

            if (transactionToDelete != null)
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                var userId = int.Parse(token.Issuer);

                _dbContext.Transactions.Remove(transactionToDelete);
                _dbContext.SaveChanges();
                var transactions = _dbContext
                    .Transactions.Where(r => r.Account.Id == userId)
                    .ToList();

                decimal transactionSum = transactions.Sum(t => t.Value);

                Object[] resultArr = new Object[] { transactions, transactionSum };

                return Ok(resultArr);
            }
            else return NotFound(id);
        }

        //Czy to potrzebne?
        [HttpGet("transactionsSum")]
        public ActionResult<Transaction> GetSumOfTransactions()
        {
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            int userId = int.Parse(token.Issuer);

            decimal transactionSum = _dbContext
            .Transactions.Where(r => r.Account.Id == userId).Sum(t => t.Value);
            
            return Ok(transactionSum);
        }


    }

}
