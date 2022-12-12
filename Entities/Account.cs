using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Elaborate.Entities
{
    public class Account
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
        [Display(Name = "Hasło")]
        [Required]
        public string PasswordHash { get; set; }

       // public virtual List<Investment> ListOfInvestments { get; set; }
        public virtual List<Transaction> ListOfTransactions { get; set; }
    }
}
