using System.ComponentModel.DataAnnotations;

namespace Elaborate.Entities
{
    public class TypeCryptoCurrency
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Nazwa Kryptowaluty")]
        [Required]
        public string Name { get; set; }
        [Display(Name = "Id image")]
        public string image { get; set; }
        [Required]
        public string Index { get; set; }
    }
}