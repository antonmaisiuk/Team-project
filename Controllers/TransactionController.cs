using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Elaborate.Elaborate.Entities;

namespace Elaborate.Controllers
{
    
    [Route("api/transaction")]
    public class TransactionController : ControllerBase
    {
        private readonly AccountDbContext _dbContext;

        public TransactionController(AccountDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
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

            if(transaction is null)
            {
                return NotFound();
            }

            return Ok(transaction);
        }
    }
    
}
