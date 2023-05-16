using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Models
{
    public class ForgotPasswordDto
    {
        [Display(Name = "Adres E-mail")]
        [Required]
        [MaxLength(40)]
        [EmailAddress]
        public string Email { get; set; }
    }
}
