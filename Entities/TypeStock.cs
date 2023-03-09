using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Elaborate.Entities
{
    public class TypeStock
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Nazwa spółki")]
        [Required]
        public string Name { get; set; }
        [Display(Name = "Id image")]
        public string image { get; set; }
    }
}
