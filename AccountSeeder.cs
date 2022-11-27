using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Elaborate.Elaborate.Entities;

namespace Elaborate
{
    public class AccountSeeder
    {
        private readonly AccountDbContext _dbContext;

        public AccountSeeder(AccountDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Seed()
        {
            if(_dbContext.Database.CanConnect())
            {
                if(!_dbContext.Accounts.Any())
                {
                    var accounts = GetAccounts();
                    _dbContext.Accounts.AddRange(accounts); //Dodajemy elementy accounts do kolekcji Accounts
                    _dbContext.SaveChanges();  // Zmiany na kontekscie bazy danych
                }
            }
        }
        private IEnumerable<Account> GetAccounts()
        {
            var accounts = new List<Account>()
            {
                new Account()
                {
                    Name = "Patryk",
                    Email = "example69@example.com",
                    Phone = 690690690,
                    PasswordHash = "123456789",
                    ListOfTransactions = new List<Transaction>()
                    {
                        new Transaction()
                        {
                            Date = DateTime.Now,
                            Value = 100,
                            Title = "Pierwsza(seeder) Transakcja",
                            Comment = "Komentarz do pierwszej Transakcji",
                            Category = "Domyślna",
                            AccountId = 1,
                           TransCategoryId = 1
                        },

                        new Transaction()
                        {
                            Date = DateTime.Now,
                            Value = 100,
                            Title = "Druga(seeder) Transakcja",
                            Comment = "Komentarz do pierwszej Transakcji",
                            Category = "Domyślna",
                            AccountId = 1,
                            TransCategoryId = 1
                        }
                    }
                },
                new Account()
                {
                    Name = "Władysław",
                    Email = "example68@example.com",
                    Phone = 690690691,
                    PasswordHash = "123456789",
                    ListOfTransactions = new List<Transaction>()
                    {
                        new Transaction()
                        {
                            Date = DateTime.Now,
                            Value = 50,
                            Title = "Pierwsza2(seeder) Transakcja",
                            Comment = "Komentarz2 do pierwszej Transakcji",
                            Category = "Domyślna",
                            AccountId = 2,
                            TransCategoryId = 1
                        },

                        new Transaction()
                        {
                            Date = DateTime.Now,
                            Value = 120,
                            Title = "Druga2(seeder) Transakcja",
                            Comment = "Komentarz2 do pierwszej Transakcji",
                            Category = "Domyślna",
                            AccountId = 2,
                            TransCategoryId = 1
                        }
                    }
                }
            };
            return accounts;
        }
    }
}
