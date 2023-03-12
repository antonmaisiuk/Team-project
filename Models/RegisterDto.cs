using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Models
{
    public class RegisterDto
    {
        [Display(Name = "Nazwa Konta")]
        [Required]
        [MaxLength(30)]
        public string Name { get; set; }

        [Display(Name = "Adres E-mail")]
        [Required]
        [MaxLength(40)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "Numer telefonu")]
        [Required]
        [Phone]
        public string Phone { get; set; }

    }
}
