using AutoMapper;
using Elaborate.Entities;
using Elaborate.Elaborate.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Elaborate.Models;
//using System.Transactions;

namespace Elaborate
{
    public interface ITransactionService
    {
        TransactionDto GetById(int id);
        IEnumerable<TransactionDto> GetAll();
        int Create(CreateTransactionDto dto);
    }
    public class TransactionService : ITransactionService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public TransactionService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public TransactionDto GetById(int id)
        {
            var transaction = _dbContext
                 .Transactions
                 .FirstOrDefault(r => r.Id == id);

            if (transaction is null) return null;

            var result = _mapper.Map<TransactionDto>(transaction);
            return result;
        }

        public IEnumerable<TransactionDto> GetAll()
        {
            var transactions = _dbContext
                 .Transactions
                 .ToList();

            var transactionsDtos = _mapper.Map<List<TransactionDto>>(transactions);
            return transactionsDtos;
        }

        public int Create(CreateTransactionDto dto)
        {
            var transaction = _mapper.Map<Transaction>(dto);
            _dbContext.Transactions.Add(transaction);
            _dbContext.SaveChanges();

            return transaction.Id;
        }
    }
}