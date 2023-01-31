using Elaborate.Elaborate.Entities;
using Elaborate.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Models
{
    public class TypeCryptoCurrencyDto
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Ilość Kryptowaluty")]
        [Range(0, (double)decimal.MaxValue)]
        [Required]
        public decimal Amount { get; set; }
        public int AccountId { get; set; }
        public virtual Account Account { get; set; }
        [Display(Name = "Nazwa Kryptowaluty")]
        [Required]
        public int TypeCryptoCurrencyId { get; set; }
        public virtual TypeCryptoCurrency TypeCryptoCurrency { get; set; }
    }
}
