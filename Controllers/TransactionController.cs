using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Elaborate.Elaborate.Entities;
using Elaborate.Entities;
using AutoMapper;
using System.Text.Json;

namespace Elaborate.Controllers
{

    [Route("api/transaction")]
    public class TransactionController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public TransactionController(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        /// <summary>
        /// Pobranie listy transakcji
        /// </summary>
        /// <returns>Listę transakcji</returns>
         [HttpGet]
         public ActionResult<IEnumerable<Transaction>> GetAll()
         {
             var transactions = _dbContext
                 .Transactions
                 .ToList();

             return Ok(transactions);
         }
        /// <summary>
        /// Pobranie transakcji po Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>transakcje</returns>
         [HttpGet("{id}")]
         public ActionResult<Transaction> Get([FromRoute] int id)
         {
             var transaction = _dbContext
                 .Transactions
                 .FirstOrDefault(r => r.Id == id);

             if (transaction is null)
             {
                 return NotFound();
             }

             return Ok(transaction);
         }
        /// <summary>
        /// Tworzenie transakcji
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult CreateTransaction([FromBody] CreateTransactionDto dto)
        {
            var transaction = _mapper.Map<Transaction>(dto);
            transaction.Date = DateTime.Now;
            _dbContext.Transactions.Add(transaction);
            _dbContext.SaveChanges();


            return Created($"/api/transaction/{transaction.Id}", null);
        }
        /*[HttpGet]
        public ActionResult<IEnumerable<Transaction>> GetAll()
        {
            var transactions = _dbContext
                .Transactions
                .ToList();

            var transactionsDtos = _mapper.Map<List<>  //Zaczęto robić mapowanie

            return Ok(transactions);
        }*/
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("/transactionsSum")]
        public ActionResult<Transaction> GetSumOfTransactions()
        {
            var transactionSum = _dbContext
                .Transactions
                .Sum(t => t.Value);
            string jsonString = JsonSerializer.Serialize(transactionSum);
            // nie sprawdzam czy istnieje jakikolwiek rekord, najwyżej zwróci 0
            return Ok(jsonString);
        }
    }
}
