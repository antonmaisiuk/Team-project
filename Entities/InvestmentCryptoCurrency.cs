using Elaborate.Elaborate.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Entities
{
    public class InvestmentCryptoCurrency
    {


        [Key]
        public int Id { get; set; }

        [Display(Name = "Ilość Kryptowaluty")]
        [Range(0, (double)decimal.MaxValue)]
        [Required]
        public decimal Amount { get; set; }
        /// <summary>
        /// Id konta do którego należy inwestycja
        /// </summary>
        public int AccountId { get; set; }
        public virtual Account Account { get; set; }
        [Display(Name = "Nazwa Kryptowaluty")]
        [Required]
        public int TypeId { get; set; }
        public virtual TypeCryptoCurrency TypeCryptoCurrency { get; set; }

    }
}
