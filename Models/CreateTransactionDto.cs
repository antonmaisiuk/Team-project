using Elaborate.Elaborate.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate
{
    public class CreateTransactionDto
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Data stworzenia Transakcji")]
        [Required]
        public DateTime Date { get; set; }
        [Display(Name = "Wartość Transakcji")]
        [Required]
        [Range(0, 999999999999999999)]
        public decimal Value { get; set; }
        [Display(Name = "Nazwa transakcji")]
        [Required]
        [MaxLength(30)]
        public string Title { get; set; }
        [Display(Name = "Komentarz do Transakcji")]
        public string Comment { get; set; }
        public int AccountId { get; set; }
        public virtual Account Account { get; set; }
        public int TransCategoryId { get; set; } = 1;
        public virtual TransCategory TransCategory { get; set; }
    }
}
