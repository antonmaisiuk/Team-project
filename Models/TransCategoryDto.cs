using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Models
{
    public class TransCategoryDto
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Nazwa Kategorii")]
        [Required]
        public string Name { get; set; }
        [Display(Name = "Id image")]
        public string image { get; set; }
    }
}
