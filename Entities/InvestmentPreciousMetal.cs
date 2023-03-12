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

    }
}
