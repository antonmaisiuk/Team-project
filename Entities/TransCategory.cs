using Elaborate.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Elaborate.Entities
{
    public class TransCategory
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Nazwa Kategorii")]
        [Required]
        public string Name { get; set; }
        [Display(Name = "Id image")]
        public string image { get; set; }

        public decimal TransactionCategorySum(int categoryId)
        {
            decimal sum = 0;

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseSqlServer("server=146.59.126.32;port=3306;uid=user;pwd=Yg5udzLxxw9ADsT;database=elaborate-db");

            using (var context = new ApplicationDbContext(optionsBuilder.Options))
            {
                List<Transaction> transactions = context.Transactions
                                    .Where(s => s.TransCategoryId == categoryId)
                                    .ToList<Transaction>();

                foreach (var t in transactions)
                {
                    sum += t.Value;
                }
            }

            return sum;
        }

        //  public ICollection<Transaction> Transactions { get; set; }
    }
}
