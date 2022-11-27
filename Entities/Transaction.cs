using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Elaborate.Entities
{
    public class Transaction
    {
            [Key]
            public int Id { get; set; }
            [Display(Name = "Data stworzenia Transakcji")]
            [Required]
            public DateTime Date { get; set; }
            [Display(Name = "Wartość Transakcji")]
            [Required]
            public float Value { get; set; }
            [Display(Name = "Nazwa transakcji")]
            [Required]
            public string Title { get; set; }
            [Display(Name = "Komentarz do Transakcji")]
            public string Comment { get; set; }
            [Display(Name = "Nazwa Kategorii")]
            [Required]
             public string Category { get; set; }

            public int AccountId { get; set; }
            public virtual Account Account { get; set; }
            public int TransCategoryId { get; set; }
            public virtual TransCategory TransCategory { get; set; }
    }
}
