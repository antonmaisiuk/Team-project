using Elaborate.Elaborate.Entities;
using Elaborate.Entities;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Elaborate.Models
{
    public class InvestmentStock
    {
        // Moddel do inwestycji w akcje

        [Key]
        public int Id { get; set; }

        [Required]
        public int Value { get; set; }
        [Display(Name = "Ilość posiadanych akcji")]
        [Range(0, double.MaxValue)]
        [Required]
        public double Amount { get; set; }
        public int AccountId { get; set; }
        public virtual Account Account { get; set; }
        [Display(Name = "id spółki której akcje chcemy kupić")]
        [Required]
        public int StockCategoryId { get; set; }
    }
}
