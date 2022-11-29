using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Elaborate.Elaborate.Entities;
using Elaborate.Entities;
using System.Text.Json;

namespace Elaborate.Controllers
{

    //[Route("api/transaction")]
    public class TransactionController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public TransactionController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        //[HttpGet]
        [Route("transactions")]
        public ActionResult<IEnumerable<Transaction>> GetAll()
        {
            var transactions = _dbContext
                .Transactions
                .ToList();

            return Ok(transactions);
        }

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

        //[HttpGet("api/transactionsSum")]
        [Route("transactionsSum")]
        public ActionResult<Transaction> GetSumOfTransactions()
        {
            decimal transactionSum = _dbContext
                .Transactions
                .Sum(t => t.Value);
            //string jsonString = JsonSerializer.Serialize(transactionSum);
            // nie sprawdzam czy istnieje jakikolwiek rekord, najwyżej zwróci 0
            return Ok(transactionSum);
        }
    }
}
