using Elaborate.Elaborate.Entities;
using Elaborate.Entities;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using System;

namespace Elaborate.Models
{
    public class CreateInvestmentCryptoCurrencyDto
    {
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
        public int TypeCryptoCurrencyId { get; set; }
        public virtual TypeCryptoCurrency TypeCryptoCurrency { get; set; }
    }
}
