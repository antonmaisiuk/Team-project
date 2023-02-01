using Elaborate.Elaborate.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Entities
{
    public class InvestmentPreciousMetal
    {
        private decimal _metalRate = 299.99m; 


        [Key]
        public int Id { get; set; }

        [Display(Name = "Ilość metalu w gramach")]
        [Range(0, double.MaxValue)]
        [Required]
        public double Amount { get; set; }
        /// <summary>
        /// Id konta do którego należy inwestycja
        /// </summary>
        public int AccountId { get; set; }
        public virtual Account Account { get; set; }
        [Display(Name = "Typ metalu")]
        [Required]
        public int TypePreciousMetalId { get; set; }
        public virtual TypePreciousMetal TypePreciousMetal { get; set; }
        public decimal ValueOfInvestment 
        {
            get
            {
                decimal decimalAmount = Convert.ToDecimal(Amount);
                return _metalRate * decimalAmount;
            }

            set
            {

            }

           
        }




        public InvestmentPreciousMetal(double amount, int accountId, int typePreciousMetalId)
        {
            this.Amount = amount;
            this.AccountId = accountId;
            this.TypePreciousMetalId = typePreciousMetalId;
        }
    }
}
