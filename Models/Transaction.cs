using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }


        [Display(Name = "Nazwa")]
        [Required]
        public DateTime date { get; set; }
        [Display(Name = "Data")]
        [Required]
        public float value { get; set; }
        [Display(Name = "Tytuł")]
        [Required]
        public string title { get; set; }
        [Display(Name = "Opis")]
        [Required]
        public string comment { get; set; }
        [Display(Name = "Kategoria")]
        [Required]
        public TransCategory category { get; set; }

    }
}
