using System;
using System.ComponentModel.DataAnnotations;

namespace Elaborate.Models
{
    public class UpdateTransaction
    {
        [Display(Name = "Nazwa transakcji")]
        [Required]
        [MaxLength(30)]
        public string Title { get; set; }

        [Display(Name = "Wartość Transakcji")]
        [Required]
        [Range(0, 999999999999999999)]
        public decimal Value { get; set; }

        [Display(Name = "Komentarz do Transakcji")]
        [MaxLength(60)]
        public string Comment { get; set; }

        [Display(Name = "Data stworzenia Transakcji")]
        [Required]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        public int TransCategoryId { get; set; }
    }
}
