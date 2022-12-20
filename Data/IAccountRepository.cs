using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Elaborate.Elaborate.Entities;

namespace Elaborate.Data
{
    public interface IAccountRepository
    {
        Account Create(Account account);
        Account GetByEmail(string email);

        Account GetById(int id);
    }
}
