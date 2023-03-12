using Elaborate.Elaborate.Entities;
using Elaborate.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Models
{
    public class CreateInvestmentPreciousMetalsDto
    {
        [Display(Name = "Ilość metalu w gramach")]
        [Range(0, double.MaxValue)]
        [Required]
        public double Amount { get; set; }
        public int AccountId { get; set; }
        public virtual Account Account { get; set; }
        [Display(Name = "Typ metalu")]
        [Required]
        public int TypePreciousMetalId { get; set; }
        public virtual TypePreciousMetal TypePreciousMetal { get; set; }
    }
}
