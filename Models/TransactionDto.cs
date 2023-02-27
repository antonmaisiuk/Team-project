using Elaborate.Elaborate.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate
{
    public class TransactionDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public decimal Value { get; set; }
        public string Title { get; set; }
        public string Comment { get; set; }
        public int AccountId { get; set; }
        public virtual Account Account { get; set; }
        public int TransCategoryId { get; set; }
        public virtual TransCategory TransCategory { get; set; }
    }
}
