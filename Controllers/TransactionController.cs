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

    //[Route("api/transaction")]
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
        //[HttpGet]
        /// <summary>
        /// Pobranie listy transakcji
        /// </summary>
        /// <returns>Listę transakcji</returns>
        [HttpGet("transactions")]
        //[Route("transactions")]
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
        /// Pobranie transakcji po Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>transakcje</returns>
        //[HttpPost("{id}")]
        //public ActionResult<Transaction> Get([FromBody] int id)
        //{
        //    var transaction = _dbContext
        //        .Transactions
        //        .FirstOrDefault(r => r.Id == id);

        //    if (transaction is null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(transaction);
        //}

        //[HttpGet("filterById")]
        //public ActionResult<Transaction> FilterByCateId([FromRoute] int id)
        //{
        //    var transactions = _dbContext
        //        .Transactions
        //        .Where(r => r.TransCategoryId == id)
        //        .ToList();

        //    return Ok(transactions);
        //}

        //public int GetNewId()
        //{
        //    int newId = 0;
        //    try
        //    {
        //        newId = _dbContext.Accounts.Max(u => u.Id);
        //    }
        //    catch (Exception ex) { }

        //    return newId;
        //}


        /// <summary>
        /// Tworzenie transakcji
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        /// 
        //[Route("addTransactions")]
        [HttpPost("addTransaction")]
        public ActionResult CreateTransaction([FromBody] CreateTransactionDto dto)
        {

            var transaction = _mapper.Map<Transaction>(dto);

            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            transaction.AccountId = int.Parse(token.Issuer);

            transaction.TransCategoryId = 1;
            //transaction.Account = dto.Account;
            //transaction.Title = dto.Title;
            _dbContext.Transactions.Add(transaction);
            _dbContext.SaveChanges();

            var transactions = _dbContext
                 .Transactions
                 .ToList();

            decimal transactionSum = transactions.Sum(t => t.Value);

            Object[] resultArr = new Object[] { transactions, transactionSum };

            return Ok(resultArr);

            //return Created($"/api/transaction/{transaction.Id}", null);
        }

        /// <summary>
        /// Zmiana danych transakcji // Bartosz Truszkowski
        /// </summary>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTransaction(int id, [FromBody] UpdateTransaction updateTransaction)
        {
            var transactionToUpdate = _dbContext.Transactions.FirstOrDefault(t => t.Id == id);

            if (transactionToUpdate is null)
                return NotFound("Nie znaleziono transakcji o podanym id");
                   
            transactionToUpdate.Title = updateTransaction.Title;
            transactionToUpdate.Value = updateTransaction.Value;
            transactionToUpdate.Date = updateTransaction.Date;

            //transactionToUpdate.Title = updateTransaction.Title;

            await _dbContext.SaveChangesAsync();

            return Ok(transactionToUpdate);
        }

        [HttpPost]
        public ActionResult<Transaction> DeleteTransaction(int transactionId)
        {
            var transactionToDelete = _dbContext.Transactions.SingleOrDefault(t => t.Id == transactionId);

            if (transactionToDelete != null)
            {
                _dbContext.Transactions.Remove(transactionToDelete);
                _dbContext.SaveChanges();
                return Ok(transactionToDelete);
            }
            else return NotFound(transactionId);
        }


        //[HttpGet]
        //public ActionResult<IEnumerable<Transaction>> GetAll()
        //{
        //    var transactions = _dbContext
        //        .Transactions
        //        .ToList();

        //    var transactionsDtos = _mapper.Map<List<>  //Zaczęto robić mapowanie

        //    return Ok(transactions);
        //}

        //[HttpGet("{id}")]
        //public ActionResult<Transaction> Get([FromRoute] int id)
        //{
        //    var transaction = _dbContext
        //        .Transactions
        //        .FirstOrDefault(r => r.Id == id);

        //    if (transaction is null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(transaction);
        //}

        [HttpGet("transactionsSum")]
        //[Route("transactionsSum")]
        public ActionResult<Transaction> GetSumOfTransactions()
        {
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            int userId = int.Parse(token.Issuer);

            decimal transactionSum = _dbContext
            .Transactions.Where(r => r.Account.Id == userId).Sum(t => t.Value);
            
            return Ok(transactionSum);
        }

        //[HttpPost]
        //public ActionResult<IEnumerable<Transaction>> Add(Transaction trans)
        //{
        //    if (_dbContext.Database.CanConnect())
        //    {
        //        _dbContext.Transactions.Add(trans);
        //        _dbContext.SaveChanges();
        //    }
        //    return Ok(trans);
        //}

        //[HttpPost("filterByMonth")]
        //public ActionResult<Transaction> FilterByMonth([FromBody] DateTime date)
        //{
        //    var transactions = _dbContext
        //        .Transactions
        //        .Where(r => r.Date.Month == date.Month)
        //        .ToList();

        //    return Ok(transactions);
        //}

    }

}
