using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Models
{
    public class AccountDto
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Nazwa Konta")]
        [Required]
        public string Name { get; set; }
        [Display(Name = "Adres E-mail")]
        [Required]
        public string Email { get; set; }
        [Display(Name = "Numer telefonu")]
        [Required]
        public string Phone { get; set; }
    }
}
