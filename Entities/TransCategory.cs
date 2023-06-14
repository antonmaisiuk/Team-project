using Elaborate.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Elaborate.Elaborate.Entities
{
    public class TransCategory
    {
        private readonly ApplicationDbContext _dbContext;

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

            List<Transaction> transactions = _dbContext.Transactions
                                .Where(s => s.TransCategoryId == categoryId)
                                .ToList<Transaction>();

            foreach (var t in transactions)
            {
                sum += t.Value;
            }

            return sum;
        }
    }
}
