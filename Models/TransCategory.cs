using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Models
{
    public class TransCategory
    {
        [Key]
        public int id { get; set; }

        [Display(Name = "Nazwa transakcji")]
        [Required]
        public string name { get; set; }

       
        public ICollection<Transaction> transactions { get; set; }
    }
}
