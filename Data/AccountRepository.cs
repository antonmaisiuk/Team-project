using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Elaborate.Elaborate.Entities;

namespace Elaborate.Data
{
    public class AccountRepository : IAccountRepository
    {
        private readonly AccountContext _context;

        public AccountRepository(AccountContext context)
        {
            _context = context;
        }

        public Account Create(Account account)
        {
            _context.Accounts.Add(account);
            account.Id = _context.SaveChanges();

            return account;
        }

        public Account GetByEmail(string email)
        {
            return _context.Accounts.FirstOrDefault(u => u.Email == email);
        }

        public Account GetById(int id)
        {
            return _context.Accounts.FirstOrDefault(u => u.Id == id);
        }
    }
}
