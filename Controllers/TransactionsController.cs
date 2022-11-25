using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionsController : ControllerBase
    {
        private static readonly List<Transaction> transactions;

        static TransactionsController()
        {
            transactions = new List<Transaction>
            {
                new Transaction
                {
                    Id = 1,
                    title = "First transactions",
                    category = "Food",
                    value = 500,
                },
                new Transaction
                {
                    Id = 2,
                    title = "Second transactions",
                    category = "Car",
                    value = 1500,
                },
                new Transaction
                {
                    Id = 3,
                    title = "Third transactions",
                    category = "Bills",
                    value = 345,
                },
            };
        }
        private readonly ILogger<TransactionsController> _logger;

        public TransactionsController(ILogger<TransactionsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<Transaction> Get()
        {
            return transactions;
        }
    }
}
